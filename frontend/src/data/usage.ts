/**
 * Local token-usage tracking.
 *
 * Every call to `streamChat` records a usage event here (model, prompt /
 * completion token counts and timing reported by Ollama in the final stream
 * chunk). Events are persisted to localStorage so the Monitoring dashboard can
 * show cumulative usage across all apps and reloads.
 */

const STORAGE_KEY = 'slm-token-usage-v1';
const MAX_EVENTS = 500;
const EVENT_NAME = 'slm-usage-updated';

export interface UsageEvent {
  /** Epoch ms when the request completed. */
  at: number;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  /** End-to-end duration reported by Ollama (ms). */
  durationMs: number;
  /** Generation-only duration reported by Ollama (ms). */
  evalMs: number;
}

export function getUsageEvents(): UsageEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UsageEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordUsage(event: UsageEvent): void {
  try {
    const events = getUsageEvents();
    events.push(event);
    while (events.length > MAX_EVENTS) events.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // Storage unavailable (private mode / quota) - usage tracking is best-effort.
  }
}

export function clearUsage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore
  }
}

/** Subscribe to usage changes (same-tab custom event + cross-tab storage event). */
export function subscribeUsage(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

export interface ModelUsage {
  model: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface UsageSummary {
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  /** Average generation throughput across recorded requests (tokens/sec). */
  avgTokensPerSec: number;
  byModel: ModelUsage[];
}

export function summarizeUsage(events: UsageEvent[]): UsageSummary {
  const summary: UsageSummary = {
    requests: events.length,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    avgTokensPerSec: 0,
    byModel: [],
  };

  const models = new Map<string, ModelUsage>();
  let evalSeconds = 0;

  for (const e of events) {
    summary.promptTokens += e.promptTokens;
    summary.completionTokens += e.completionTokens;
    summary.totalTokens += e.totalTokens;
    evalSeconds += e.evalMs / 1000;

    const entry = models.get(e.model) ?? {
      model: e.model,
      requests: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    };
    entry.requests += 1;
    entry.promptTokens += e.promptTokens;
    entry.completionTokens += e.completionTokens;
    entry.totalTokens += e.totalTokens;
    models.set(e.model, entry);
  }

  summary.avgTokensPerSec =
    evalSeconds > 0 ? summary.completionTokens / evalSeconds : 0;
  summary.byModel = [...models.values()].sort(
    (a, b) => b.totalTokens - a.totalTokens,
  );

  return summary;
}
