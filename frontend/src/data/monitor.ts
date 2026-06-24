/**
 * System health checks for the Monitoring dashboard.
 *
 * Two sources are combined:
 *  - Browser probes: timed `fetch` calls to services reachable from the page
 *    (Ollama, CRM API, the frontend itself). Cross-origin UIs that don't send
 *    CORS headers are probed in `no-cors` mode for reachability only.
 *  - Backend health: the CRM API exposes `/api/health`, which checks Temporal
 *    and the Supabase database server-side (the browser cannot reach those).
 */

import { getOllamaUrl } from './ollama';
import { getCrmUrl } from './crm';

export type HealthStatus = 'up' | 'degraded' | 'down';

export interface ServiceResult {
  name: string;
  url: string;
  status: HealthStatus;
  latencyMs?: number;
  detail?: string;
  error?: string;
}

interface BrowserProbe {
  name: string;
  url: string;
  /** `cors` reads the response status; `probe` only checks reachability. */
  kind: 'cors' | 'probe';
}

function browserProbes(): BrowserProbe[] {
  const ollama = getOllamaUrl().replace(/\/$/, '');
  const crm = getCrmUrl().replace(/\/$/, '');
  return [
    { name: 'Ollama (LLM)', url: `${ollama}/api/tags`, kind: 'cors' },
    { name: 'CRM API', url: `${crm}/api/contacts?limit=1`, kind: 'cors' },
    { name: 'Frontend', url: `${window.location.origin}/`, kind: 'cors' },
    { name: 'Temporal UI', url: 'http://localhost:8080', kind: 'probe' },
    { name: 'Mailpit', url: 'http://localhost:8025', kind: 'probe' },
  ];
}

async function runProbe(probe: BrowserProbe): Promise<ServiceResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  const start = performance.now();
  try {
    const res = await fetch(probe.url, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
      mode: probe.kind === 'probe' ? 'no-cors' : 'cors',
    });
    const latencyMs = Math.round(performance.now() - start);
    // Opaque responses (no-cors) can't be inspected; reaching them = up.
    if (probe.kind === 'probe' || res.type === 'opaque') {
      return { name: probe.name, url: probe.url, status: 'up', latencyMs };
    }
    return {
      name: probe.name,
      url: probe.url,
      status: res.ok ? 'up' : 'degraded',
      latencyMs,
      detail: res.ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      name: probe.name,
      url: probe.url,
      status: 'down',
      error: err instanceof Error ? err.message : 'unreachable',
    };
  } finally {
    clearTimeout(timeout);
  }
}

interface BackendHealth {
  overall?: string;
  services?: Array<{
    name: string;
    status: string;
    latency_ms?: number;
    detail?: string;
    error?: string;
  }>;
}

async function backendServices(): Promise<ServiceResult[]> {
  const crm = getCrmUrl().replace(/\/$/, '');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${crm}/api/health`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = (await res.json()) as BackendHealth;
    return (data.services ?? []).map((s) => ({
      name: s.name,
      url: `${crm}/api/health`,
      status: (s.status === 'up'
        ? 'up'
        : s.status === 'degraded'
          ? 'degraded'
          : 'down') as HealthStatus,
      latencyMs: s.latency_ms,
      detail: s.detail,
      error: s.error,
    }));
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export interface SystemHealth {
  overall: HealthStatus;
  services: ServiceResult[];
  checkedAt: number;
}

export async function collectHealth(): Promise<SystemHealth> {
  const [probes, backend] = await Promise.all([
    Promise.all(browserProbes().map(runProbe)),
    backendServices(),
  ]);
  const services = [...probes, ...backend];
  const overall: HealthStatus = services.some((s) => s.status === 'down')
    ? 'down'
    : services.some((s) => s.status === 'degraded')
      ? 'degraded'
      : 'up';
  return { overall, services, checkedAt: Date.now() };
}
