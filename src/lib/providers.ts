// ── API Provider Registry ──
// Defines all supported image generation providers with their models,
// endpoints, and client-side configuration.

export interface ProviderModel {
  id: string;
  name: string;
  speed?: string; // e.g. "~10s"
}

export interface ProviderConfig {
  id: string;
  name: string;
  icon: string; // emoji for simplicity
  keyFormat: string; // e.g. "hf_xxxxx"
  keyPrefix: string; // localStorage key
  signupUrl: string;
  description: string;
  models: ProviderModel[];
  isServerSide?: boolean; // uses server env var, not user key
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'huggingface',
    name: 'Hugging Face',
    icon: '🤗',
    keyFormat: 'hf_xxxxx',
    keyPrefix: 'ink_api_huggingface',
    signupUrl: 'https://huggingface.co/settings/tokens',
    description: 'Free tier included. Built-in server token for instant generation.',
    models: [
      { id: 'hf_flux_schnell', name: 'FLUX.1 Schnell', speed: '~10s' },
      { id: 'hf_sdxl', name: 'Stable Diffusion XL', speed: '~15s' },
    ],
    isServerSide: true,
  },
  {
    id: 'replicate',
    name: 'Replicate',
    icon: '🔁',
    keyFormat: 'r8_xxxxx',
    keyPrefix: 'ink_api_replicate',
    signupUrl: 'https://replicate.com/account/api-tokens',
    description: '$5 free credits on signup. Supports FLUX.1 and community models.',
    models: [
      { id: 'replicate_flux', name: 'FLUX.1 Schnell', speed: '~12s' },
    ],
  },
  {
    id: 'fal',
    name: 'FAL.AI',
    icon: '⚡',
    keyFormat: 'Bearer token',
    keyPrefix: 'ink_api_fal',
    signupUrl: 'https://fal.ai/dashboard/keys',
    description: 'Free credits on signup. 600+ models including Flux 2 and Recraft V4.',
    models: [
      { id: 'fal_flux2', name: 'Flux 2 Pro', speed: '~15s' },
      { id: 'fal_recraft', name: 'Recraft V4', speed: '~20s' },
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '🧠',
    keyFormat: 'sk-xxxxx',
    keyPrefix: 'ink_api_openai',
    signupUrl: 'https://platform.openai.com/api-keys',
    description: 'DALL-E 3 and GPT Image generation.',
    models: [
      { id: 'openai_dalle3', name: 'DALL-E 3', speed: '~15s' },
    ],
  },
  {
    id: 'google',
    name: 'Google AI',
    icon: '🔮',
    keyFormat: 'AI Studio key',
    keyPrefix: 'ink_api_google',
    signupUrl: 'https://aistudio.google.com/apikey',
    description: 'Imagen 4 and experimental models.',
    models: [
      { id: 'google_imagen', name: 'Imagen 4', speed: '~20s' },
    ],
  },
  {
    id: 'recraft',
    name: 'Recraft',
    icon: '🎨',
    keyFormat: 'Bearer token',
    keyPrefix: 'ink_api_recraft',
    signupUrl: 'https://www.recraft.ai/docs',
    description: 'Best for editorial illustration and SVG vector output.',
    models: [
      { id: 'recraft_v4', name: 'Recraft V4', speed: '~20s' },
      { id: 'recraft_v4_svg', name: 'Recraft V4 Vector (SVG)', speed: '~25s' },
    ],
  },
  {
    id: 'together',
    name: 'Together.ai',
    icon: '🤝',
    keyFormat: 'Bearer token',
    keyPrefix: 'ink_api_together',
    signupUrl: 'https://api.together.xyz/settings/api-keys',
    description: 'Free credits on signup. FLUX.1 and open models.',
    models: [
      { id: 'together_flux', name: 'FLUX.1 Schnell', speed: '~10s' },
    ],
  },
  {
    id: 'stability',
    name: 'Stability AI',
    icon: '🏔️',
    keyFormat: 'sk-xxxxx',
    keyPrefix: 'ink_api_stability',
    signupUrl: 'https://platform.stability.ai/account/keys',
    description: 'Stable Diffusion 3.5 and SDXL.',
    models: [
      { id: 'stability_sd35', name: 'Stable Diffusion 3.5', speed: '~15s' },
    ],
  },
];

// ── Key management (client-side localStorage) ──

export function getProviderKey(providerId: string): string {
  if (typeof window === 'undefined') return '';
  const provider = PROVIDERS.find((p) => p.id === providerId);
  if (!provider) return '';
  return localStorage.getItem(provider.keyPrefix) || '';
}

export function setProviderKey(providerId: string, key: string): void {
  const provider = PROVIDERS.find((p) => p.id === providerId);
  if (!provider) return;
  if (key.trim()) {
    localStorage.setItem(provider.keyPrefix, key.trim());
  } else {
    localStorage.removeItem(provider.keyPrefix);
  }
}

export function isProviderActive(providerId: string): boolean {
  const provider = PROVIDERS.find((p) => p.id === providerId);
  if (!provider) return false;
  if (provider.isServerSide) return true; // Always available (server token)
  return Boolean(getProviderKey(providerId));
}

// ── Available models (grouped) ──

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  speed?: string;
  group: 'free' | 'custom';
}

export function getAvailableModels(): ModelOption[] {
  const models: ModelOption[] = [];

  for (const provider of PROVIDERS) {
    const active = isProviderActive(provider.id);
    if (!active) continue;

    for (const model of provider.models) {
      models.push({
        id: model.id,
        name: model.name,
        provider: provider.name,
        speed: model.speed,
        group: provider.isServerSide ? 'free' : 'custom',
      });
    }
  }

  return models;
}
