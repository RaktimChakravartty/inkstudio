import { getProviderKey } from './providers';

export interface GenerationResult {
  image: string;
  model: string;
}

export interface GenerationAdapter {
  name: string;
  id: string;
  generate(prompt: string, negativePrompt: string): Promise<GenerationResult>;
}

// ── Server-side adapter (routes through /api/generate) ──

class ServerAdapter implements GenerationAdapter {
  name: string;
  id: string;
  private provider: string;
  private modelId: string;

  constructor(id: string, name: string, provider: string, modelId: string) {
    this.id = id;
    this.name = name;
    this.provider = provider;
    this.modelId = modelId;
  }

  async generate(prompt: string, negativePrompt: string): Promise<GenerationResult> {
    // Get user API key if applicable
    const apiKey = getProviderKey(this.provider);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        negativePrompt,
        provider: this.provider,
        model: this.modelId,
        apiKey: apiKey || undefined,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(err.error || `Generation failed (${response.status})`);
    }

    const data = await response.json();
    return { image: data.image, model: data.model };
  }
}

// ── Copy Prompt (always available) ──

class CopyPromptAdapter implements GenerationAdapter {
  name = 'Copy Prompt (No API)';
  id = 'copy_prompt';

  async generate(): Promise<GenerationResult> {
    throw new Error('COPY_ONLY');
  }
}

// ── Registry ──

export function getAvailableAdapters(): GenerationAdapter[] {
  const { getAvailableModels } = require('./providers');
  const models = getAvailableModels();
  const adapters: GenerationAdapter[] = [];

  for (const model of models) {
    adapters.push(
      new ServerAdapter(
        model.id,
        `${model.name} (${model.provider})${model.speed ? ` — ${model.speed}` : ''}`,
        model.provider.toLowerCase().replace(/[.\s]/g, ''),
        model.id,
      )
    );
  }

  adapters.push(new CopyPromptAdapter());
  return adapters;
}
