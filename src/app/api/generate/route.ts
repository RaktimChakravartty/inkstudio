import { InferenceClient } from '@huggingface/inference';

const HF_TOKEN = process.env.HF_TOKEN || '';

export const maxDuration = 60;

// ── Model ID mapping ──
const HF_MODELS: Record<string, string> = {
  hf_flux_schnell: 'black-forest-labs/FLUX.1-schnell',
  hf_sdxl: 'stabilityai/stable-diffusion-xl-base-1.0',
};

export async function POST(request: Request) {
  let body: {
    prompt: string;
    negativePrompt?: string;
    provider?: string;
    model?: string;
    apiKey?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { prompt, negativePrompt, provider, model, apiKey } = body;
  if (!prompt || typeof prompt !== 'string') {
    return Response.json({ error: 'prompt is required' }, { status: 400 });
  }

  // ── Route by provider ──

  const providerName = (provider || 'huggingface').toLowerCase().replace(/[.\s]/g, '');

  switch (providerName) {
    case 'huggingface':
      return handleHuggingFace(prompt, model, apiKey);

    case 'openai':
      return handleOpenAI(prompt, apiKey);

    case 'recraft':
      return handleRecraft(prompt, model, apiKey);

    case 'together':
    case 'togetherai':
      return handleTogether(prompt, apiKey);

    case 'stabilityai':
    case 'stability':
      return handleStability(prompt, apiKey);

    case 'fal':
    case 'falai':
      return handleFal(prompt, model, apiKey);

    case 'replicate':
      return handleReplicate(prompt, apiKey);

    case 'google':
    case 'googleai':
      return handleGoogle(prompt, apiKey);

    default:
      return handleHuggingFace(prompt, model, apiKey);
  }
}

// ── Hugging Face ──

async function handleHuggingFace(prompt: string, model?: string, userKey?: string) {
  const token = userKey || HF_TOKEN;
  if (!token) {
    return Response.json({ error: 'HF_TOKEN is not configured on the server and no user key provided' }, { status: 500 });
  }

  const client = new InferenceClient(token);
  const modelId = (model && HF_MODELS[model]) || HF_MODELS.hf_flux_schnell;
  const fallbackId = HF_MODELS.hf_sdxl;

  for (const mid of [modelId, fallbackId]) {
    try {
      const imageBlob = await client.textToImage({
        model: mid,
        inputs: prompt,
        parameters: {
          num_inference_steps: mid.includes('FLUX') ? 4 : 30,
        },
      });

      const blob = imageBlob as unknown as Blob;
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = blob.type || 'image/png';

      return Response.json({
        image: `data:${mimeType};base64,${base64}`,
        model: mid,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[HF] ${mid} failed:`, msg);
      if (mid === fallbackId) {
        return Response.json({ error: `Hugging Face generation failed: ${msg}` }, { status: 502 });
      }
    }
  }

  return Response.json({ error: 'All HF models failed' }, { status: 502 });
}

// ── OpenAI (DALL-E 3) ──

async function handleOpenAI(prompt: string, apiKey?: string) {
  if (!apiKey) return Response.json({ error: 'OpenAI API key required' }, { status: 400 });

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: `OpenAI error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) return Response.json({ error: 'No image returned from OpenAI' }, { status: 502 });

  return Response.json({
    image: `data:image/png;base64,${b64}`,
    model: 'dall-e-3',
  });
}

// ── Recraft ──

async function handleRecraft(prompt: string, model?: string, apiKey?: string) {
  if (!apiKey) return Response.json({ error: 'Recraft API key required' }, { status: 400 });

  const style = model?.includes('svg') ? 'vector_illustration' : 'digital_illustration';

  const response = await fetch('https://external.api.recraft.ai/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      style,
      model: 'recraftv3',
      size: '1024x1024',
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: `Recraft error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) return Response.json({ error: 'No image from Recraft' }, { status: 502 });

  return Response.json({
    image: `data:image/png;base64,${b64}`,
    model: model?.includes('svg') ? 'recraft_v4_svg' : 'recraft_v4',
  });
}

// ── Together.ai ──

async function handleTogether(prompt: string, apiKey?: string) {
  if (!apiKey) return Response.json({ error: 'Together.ai API key required' }, { status: 400 });

  const response = await fetch('https://api.together.xyz/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'black-forest-labs/FLUX.1-schnell-Free',
      prompt,
      width: 1024,
      height: 1024,
      n: 1,
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: `Together error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) return Response.json({ error: 'No image from Together' }, { status: 502 });

  return Response.json({
    image: `data:image/png;base64,${b64}`,
    model: 'together_flux',
  });
}

// ── Stability AI ──

async function handleStability(prompt: string, apiKey?: string) {
  if (!apiKey) return Response.json({ error: 'Stability AI API key required' }, { status: 400 });

  const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/sd3', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
    body: (() => {
      const fd = new FormData();
      fd.append('prompt', prompt);
      fd.append('output_format', 'png');
      return fd;
    })(),
  });

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: `Stability error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const b64 = data.image;
  if (!b64) return Response.json({ error: 'No image from Stability' }, { status: 502 });

  return Response.json({
    image: `data:image/png;base64,${b64}`,
    model: 'stability_sd35',
  });
}

// ── FAL.AI ──

async function handleFal(prompt: string, model?: string, apiKey?: string) {
  if (!apiKey) return Response.json({ error: 'FAL.AI API key required' }, { status: 400 });

  const falModel = model?.includes('recraft')
    ? 'fal-ai/recraft-v3'
    : 'fal-ai/flux/schnell';

  const response = await fetch(`https://fal.run/${falModel}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      image_size: 'landscape_4_3',
      num_images: 1,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: `FAL error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const imageUrl = data.images?.[0]?.url;
  if (!imageUrl) return Response.json({ error: 'No image from FAL' }, { status: 502 });

  // FAL returns URLs, fetch and convert to base64
  const imgResponse = await fetch(imageUrl);
  const imgBuffer = await imgResponse.arrayBuffer();
  const b64 = Buffer.from(imgBuffer).toString('base64');

  return Response.json({
    image: `data:image/png;base64,${b64}`,
    model: model?.includes('recraft') ? 'fal_recraft' : 'fal_flux2',
  });
}

// ── Replicate ──

async function handleReplicate(prompt: string, apiKey?: string) {
  if (!apiKey) return Response.json({ error: 'Replicate API key required' }, { status: 400 });

  const createResponse = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'black-forest-labs/flux-schnell',
      input: { prompt, num_outputs: 1 },
    }),
  });

  if (!createResponse.ok) {
    return Response.json({ error: `Replicate error: ${await createResponse.text()}` }, { status: 502 });
  }

  let result = await createResponse.json();

  // Poll for completion (max 60s)
  const deadline = Date.now() + 55000;
  while (result.status !== 'succeeded' && result.status !== 'failed' && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 2000));
    const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
      headers: { Authorization: `Token ${apiKey}` },
    });
    result = await pollResponse.json();
  }

  if (result.status === 'failed') {
    return Response.json({ error: 'Replicate generation failed' }, { status: 502 });
  }
  if (result.status !== 'succeeded') {
    return Response.json({ error: 'Replicate generation timed out' }, { status: 504 });
  }

  const imageUrl = result.output?.[0];
  if (!imageUrl) return Response.json({ error: 'No image from Replicate' }, { status: 502 });

  // Convert to base64
  const imgResponse = await fetch(imageUrl);
  const imgBuffer = await imgResponse.arrayBuffer();
  const b64 = Buffer.from(imgBuffer).toString('base64');

  return Response.json({
    image: `data:image/png;base64,${b64}`,
    model: 'replicate_flux',
  });
}

// ── Google AI (Imagen) ──

async function handleGoogle(prompt: string, apiKey?: string) {
  if (!apiKey) return Response.json({ error: 'Google AI API key required' }, { status: 400 });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: `Google AI error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const b64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) return Response.json({ error: 'No image from Google AI' }, { status: 502 });

  return Response.json({
    image: `data:image/png;base64,${b64}`,
    model: 'google_imagen',
  });
}
