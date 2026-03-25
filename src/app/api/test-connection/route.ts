import { InferenceClient } from '@huggingface/inference';

const HF_TOKEN = process.env.HF_TOKEN || '';

export async function POST(request: Request) {
  let body: { provider: string; apiKey?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { provider, apiKey } = body;

  try {
    switch (provider) {
      case 'huggingface': {
        const token = apiKey || HF_TOKEN;
        if (!token) return Response.json({ ok: false, error: 'No token available' });
        // Test by checking the HF API model info endpoint
        const res = await fetch('https://huggingface.co/api/models/black-forest-labs/FLUX.1-schnell', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return Response.json({ ok: true, detail: 'Connected to Hugging Face' });
        return Response.json({ ok: false, error: `HTTP ${res.status}` });
      }

      case 'openai': {
        if (!apiKey) return Response.json({ ok: false, error: 'No API key' });
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (res.ok) return Response.json({ ok: true, detail: 'Connected to OpenAI' });
        return Response.json({ ok: false, error: `HTTP ${res.status}` });
      }

      case 'replicate': {
        if (!apiKey) return Response.json({ ok: false, error: 'No API key' });
        const res = await fetch('https://api.replicate.com/v1/account', {
          headers: { Authorization: `Token ${apiKey}` },
        });
        if (res.ok) return Response.json({ ok: true, detail: 'Connected to Replicate' });
        return Response.json({ ok: false, error: `HTTP ${res.status}` });
      }

      case 'together':
      case 'togetherai': {
        if (!apiKey) return Response.json({ ok: false, error: 'No API key' });
        const res = await fetch('https://api.together.xyz/v1/models', {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (res.ok) return Response.json({ ok: true, detail: 'Connected to Together.ai' });
        return Response.json({ ok: false, error: `HTTP ${res.status}` });
      }

      default:
        // For providers we can't easily test, just validate key format
        if (apiKey && apiKey.length > 5) {
          return Response.json({ ok: true, detail: 'Key saved (connection not verified)' });
        }
        return Response.json({ ok: false, error: 'No API key provided' });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ ok: false, error: msg });
  }
}
