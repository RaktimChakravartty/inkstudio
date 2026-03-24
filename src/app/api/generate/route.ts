import { InferenceClient } from '@huggingface/inference';

const HF_TOKEN = process.env.HF_TOKEN || '';

const PRIMARY_MODEL = 'black-forest-labs/FLUX.1-schnell';
const FALLBACK_MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';

export const maxDuration = 60;

export async function POST(request: Request) {
  if (!HF_TOKEN) {
    return Response.json(
      { error: 'HF_TOKEN is not configured on the server' },
      { status: 500 }
    );
  }

  let body: { prompt: string; model?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { prompt, model } = body;
  if (!prompt || typeof prompt !== 'string') {
    return Response.json({ error: 'prompt is required' }, { status: 400 });
  }

  const client = new InferenceClient(HF_TOKEN);

  // Determine which model to use
  const requestedModel = model || PRIMARY_MODEL;
  const modelsToTry =
    requestedModel === PRIMARY_MODEL
      ? [PRIMARY_MODEL, FALLBACK_MODEL]
      : [requestedModel, PRIMARY_MODEL, FALLBACK_MODEL];

  let lastError: string = '';

  for (const modelId of modelsToTry) {
    try {
      const imageBlob = await client.textToImage({
        model: modelId,
        inputs: prompt,
        parameters: {
          num_inference_steps: modelId.includes('FLUX') ? 4 : 30,
        },
      });

      // Convert result to base64 data URL
      const blob = imageBlob as unknown as Blob;
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = blob.type || 'image/png';
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return Response.json({
        image: dataUrl,
        model: modelId,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      lastError = `${modelId}: ${message}`;
      console.error(`[generate] ${modelId} failed:`, message);

      // If this isn't the last model, continue to fallback
      if (modelId !== modelsToTry[modelsToTry.length - 1]) {
        console.log(`[generate] Falling back from ${modelId}...`);
        continue;
      }
    }
  }

  return Response.json(
    { error: `All models failed. Last error: ${lastError}` },
    { status: 502 }
  );
}
