export interface GenerationAdapter {
  name: string;
  id: string;
  generate(prompt: string, negativePrompt: string): Promise<{ image: string; model: string }>;
}

// ---------- Hugging Face (via server-side API route) ----------

export class HuggingFaceAdapter implements GenerationAdapter {
  name: string;
  id: string;
  private modelId: string;

  constructor(modelId: string, name: string, id: string) {
    this.modelId = modelId;
    this.name = name;
    this.id = id;
  }

  async generate(prompt: string): Promise<{ image: string; model: string }> {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model: this.modelId }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(err.error || `Generation failed (${response.status})`);
    }

    const data = await response.json();
    return { image: data.image, model: data.model };
  }
}

// ---------- Replicate (client-side, user provides key) ----------

export class ReplicateAdapter implements GenerationAdapter {
  name = 'Replicate (FLUX.1-schnell)';
  id = 'replicate_flux';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string): Promise<{ image: string; model: string }> {
    const createResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'black-forest-labs/flux-schnell',
        input: { prompt, num_outputs: 1 },
      }),
    });

    if (!createResponse.ok) {
      throw new Error(`Replicate API error: ${await createResponse.text()}`);
    }

    const prediction = await createResponse.json();
    let result = prediction;

    // Poll for completion
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise((r) => setTimeout(r, 2000));
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { Authorization: `Token ${this.apiKey}` },
      });
      result = await pollResponse.json();
    }

    if (result.status === 'failed') {
      throw new Error('Replicate generation failed');
    }

    return { image: result.output[0], model: 'replicate_flux' };
  }
}

// ---------- Copy Prompt (always available) ----------

export class CopyPromptAdapter implements GenerationAdapter {
  name = 'Copy Prompt (No API)';
  id = 'copy_prompt';

  async generate(): Promise<{ image: string; model: string }> {
    throw new Error('COPY_ONLY');
  }
}

// ---------- Registry ----------

export function getAvailableAdapters(): GenerationAdapter[] {
  const adapters: GenerationAdapter[] = [];

  // Server-side HF models (always available when HF_TOKEN is set on server)
  adapters.push(
    new HuggingFaceAdapter(
      'black-forest-labs/FLUX.1-schnell',
      'FLUX.1 Schnell (Fast)',
      'hf_flux_schnell'
    )
  );
  adapters.push(
    new HuggingFaceAdapter(
      'stabilityai/stable-diffusion-xl-base-1.0',
      'Stable Diffusion XL',
      'hf_sdxl'
    )
  );

  // Client-side Replicate (only if user provides key)
  if (typeof window !== 'undefined') {
    const repKey = localStorage.getItem('ink_api_replicate');
    if (repKey) {
      adapters.push(new ReplicateAdapter(repKey));
    }
  }

  adapters.push(new CopyPromptAdapter());
  return adapters;
}
