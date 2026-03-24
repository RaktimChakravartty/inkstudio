export interface GenerationAdapter {
  name: string;
  id: string;
  generate(prompt: string, negativePrompt: string): Promise<string>; // returns image URL or data URL
}

// ---------- Hugging Face ----------

export class HuggingFaceAdapter implements GenerationAdapter {
  name = 'Hugging Face (FLUX.1-schnell)';
  id = 'huggingface_flux';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'black-forest-labs/FLUX.1-schnell') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    const response = await fetch(`https://api-inference.huggingface.co/models/${this.model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Hugging Face API error: ${err}`);
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

// ---------- Replicate ----------

export class ReplicateAdapter implements GenerationAdapter {
  name = 'Replicate (FLUX.1-schnell)';
  id = 'replicate_flux';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string): Promise<string> {
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

    return result.output[0];
  }
}

// ---------- Copy Prompt (always available) ----------

export class CopyPromptAdapter implements GenerationAdapter {
  name = 'Copy Prompt (No API)';
  id = 'copy_prompt';

  async generate(): Promise<string> {
    throw new Error('COPY_ONLY');
  }
}

// ---------- Registry ----------

export function getAvailableAdapters(): GenerationAdapter[] {
  const adapters: GenerationAdapter[] = [];

  if (typeof window !== 'undefined') {
    const hfKey = localStorage.getItem('ink_api_huggingface');
    if (hfKey) {
      adapters.push(new HuggingFaceAdapter(hfKey));
    }

    const repKey = localStorage.getItem('ink_api_replicate');
    if (repKey) {
      adapters.push(new ReplicateAdapter(repKey));
    }
  }

  adapters.push(new CopyPromptAdapter());
  return adapters;
}
