/**
 * Brand metadata (logo, vendor, and official link) for the small language
 * models shipped with this playground. Keyed by the model's base name (tag
 * stripped), with a keyword fallback so close variants still resolve.
 *
 * `logo` is an emoji/symbol so it renders fully offline with no external
 * assets; `url` points at the model's page on the Ollama library.
 */

export interface ModelBrand {
  /** Human-friendly vendor / family name. */
  vendor: string;
  /** Emoji or short symbol used as a lightweight logo. */
  logo: string;
  /** Official model page (opens in a new tab). */
  url: string;
}

const BRANDS: Record<string, ModelBrand> = {
  'qwen2.5': {
    vendor: 'Alibaba · Qwen',
    logo: '🌐',
    url: 'https://ollama.com/library/qwen2.5',
  },
  'llama3.2': {
    vendor: 'Meta · Llama',
    logo: '🦙',
    url: 'https://ollama.com/library/llama3.2',
  },
  'gemma2': {
    vendor: 'Google · Gemma',
    logo: '💎',
    url: 'https://ollama.com/library/gemma2',
  },
  'deepseek-r1': {
    vendor: 'DeepSeek · R1',
    logo: '🐋',
    url: 'https://ollama.com/library/deepseek-r1',
  },
  'phi3.5': {
    vendor: 'Microsoft · Phi',
    logo: 'φ',
    url: 'https://ollama.com/library/phi3.5',
  },
};

const FALLBACK: ModelBrand = {
  vendor: 'Ollama model',
  logo: '🧠',
  url: 'https://ollama.com/library',
};

/** Resolve brand metadata for a full model name (e.g. `gemma2:2b`). */
export function getModelBrand(name: string): ModelBrand {
  const base = name.split(':')[0].toLowerCase();
  if (BRANDS[base]) return BRANDS[base];
  const key = Object.keys(BRANDS).find(
    (k) => base.includes(k) || k.includes(base),
  );
  return key ? BRANDS[key] : FALLBACK;
}
