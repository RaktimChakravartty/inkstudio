import type { InkMode, Vertical, Composition } from '@/types/database';
import type { Palette } from '@/types/database';
import { DEFAULT_STYLE_BLOCK, DEFAULT_EXCLUSIONS_BLOCK, COMPOSITION_DESCRIPTIONS, INK_MODE_LABELS, COMPOSITION_LABELS, VERTICAL_LABELS } from './constants';

export interface PromptParams {
  inkMode: InkMode;
  vertical: Vertical;
  composition: Composition;
  subject: string;
  accentColours: string[];
  palette: Palette | null;
  styleBlock?: string;
  exclusionsBlock?: string;
  detailLevel?: number; // 0-100, controls how much detail to include
}

export type PlatformVariant = 'universal' | 'midjourney' | 'recraft' | 'freepik' | 'dalle' | 'stable_diffusion';

export const PLATFORM_LABELS: Record<PlatformVariant, string> = {
  universal: 'Universal',
  midjourney: 'Midjourney',
  recraft: 'Recraft',
  freepik: 'Freepik',
  dalle: 'DALL-E / ChatGPT',
  stable_diffusion: 'Stable Diffusion',
};

// ── Section builders ──

function getInkModeDirective(mode: InkMode, colours: string[], palette: Palette | null): string {
  switch (mode) {
    case 'pure_ink':
      return 'Pure black ink on white paper. No colour whatsoever. No grey tones. Solid black fills only for hair and occasional clothing emphasis.';
    case 'single_register': {
      const colour = colours[0] || (palette?.vertical_space_hex ?? '#E8A317');
      return `Black ink base illustration with ONE accent colour (${colour}) applied as flat solid fill on maximum 20% of image area. Apply colour on ONLY one of: technology screens, OR one architectural plane, OR one clothing item. Never more than one category. Skin tones as flat warm fill when faces are prominent.`;
    }
    case 'double_register': {
      const primary = colours[0] || (palette?.vertical_space_hex ?? '#E8A317');
      const secondary = colours[1] || (palette?.vertical_people_hex ?? '#E86A50');
      return `Black ink base illustration with TWO accent colours. Primary colour (${primary}) at 15% of image area, secondary colour (${secondary}) at 10% of image area. The two colours should not touch or overlap.`;
    }
    case 'tinted_mono': {
      const tint = colours[0] || (palette?.vertical_tech_hex ?? '#2B5EA7');
      return `No black ink. Entire linework drawn in a single dark colour (${tint}). Fills in lighter tints of the same colour. Duotone effect. The illustration should feel monochromatic and cohesive.`;
    }
  }
}

function getVerticalContext(vertical: Vertical): string {
  switch (vertical) {
    case 'space':
      return 'The scene depicts a workplace/architectural space environment.';
    case 'people':
      return 'The scene focuses on people and human interaction.';
    case 'tech':
      return 'The scene highlights technology and digital equipment in a workplace.';
    case 'master':
    case 'custom':
      return '';
  }
}

// ── Structured prompt with labeled sections ──

export interface StructuredPrompt {
  style: string;
  subject: string;
  composition: string;
  colour: string;
  exclusions: string;
}

export function getStructuredSections(params: PromptParams): StructuredPrompt {
  const {
    inkMode,
    vertical,
    composition,
    subject,
    accentColours,
    palette,
    styleBlock = DEFAULT_STYLE_BLOCK,
    exclusionsBlock = DEFAULT_EXCLUSIONS_BLOCK,
    detailLevel = 100,
  } = params;

  // Style section — at low detail, use a condensed version
  let style = styleBlock;
  if (detailLevel < 50) {
    style = 'Hand-drawn editorial ink illustration with confident, gestural brushpen linework. Black ink on white. Variable line weight. Lines are organic and slightly imperfect. Human figures have natural proportions. The style feels like editorial illustration from Monocle magazine or The New Yorker.';
  } else if (detailLevel < 80) {
    style = 'Hand-drawn editorial ink illustration with confident, gestural brushpen linework. Black ink on white. Variable line weight: heavier on outer contours (3-4px), lighter on interior details (1-1.5px). Lines are organic with occasional breaks where strokes trail off. Human figures with natural proportions (~1:5.5 head-to-body). Faces include simple line-drawn eyes, small nose, optional mouth. Hands are 3-4 finger gestural shorthand. Furniture as outline only. The quality suggests a Pentel Pocket Brush Pen on smooth paper. The style feels like editorial illustration from Monocle, The New Yorker, or WeWork.';
  }

  // Subject section
  const verticalCtx = getVerticalContext(vertical);
  const subjectParts: string[] = [];
  if (subject.trim()) subjectParts.push(subject.trim());
  if (verticalCtx) subjectParts.push(verticalCtx);
  const subjectText = subjectParts.join(' ') || 'Editorial illustration scene.';

  // Composition section
  const compositionText = `${COMPOSITION_LABELS[composition]}: ${COMPOSITION_DESCRIPTIONS[composition]}`;

  // Colour section
  const colourText = getInkModeDirective(inkMode, accentColours, palette);

  // Exclusions — at low detail, condense
  let exclusions = exclusionsBlock;
  if (detailLevel < 50) {
    exclusions = 'No gradients, shadows, glow, 3D, photorealism, vector linework, uniform strokes, filled backgrounds, or text. Must look hand-drawn.';
  } else if (detailLevel < 80) {
    exclusions = 'No gradients. No drop shadows. No glow effects. No 3D rendering. No photorealistic elements. No smooth digital vector linework. No uniform stroke width. No filled backgrounds. No detailed patterns on clothing. No watermarks. Must look hand-drawn, not digitally generated.';
  }

  return { style, subject: subjectText, composition: compositionText, colour: colourText, exclusions };
}

// ── Universal (labeled) prompt ──

export function assemblePrompt(params: PromptParams): string {
  const s = getStructuredSections(params);
  return [
    `── STYLE ──\n${s.style}`,
    `── SUBJECT ──\n${s.subject}`,
    `── COMPOSITION ──\n${s.composition}`,
    `── COLOUR ──\n${s.colour}`,
    `── EXCLUSIONS ──\n${s.exclusions}`,
  ].join('\n\n');
}

// ── Raw prompt (no labels, for API calls) ──

export function assembleRawPrompt(params: PromptParams): string {
  const s = getStructuredSections(params);
  return [s.style, s.subject, s.composition, s.colour].join('\n\n');
}

// ── Platform variants ──

export function assemblePlatformPrompt(params: PromptParams, platform: PlatformVariant): string {
  const s = getStructuredSections(params);

  switch (platform) {
    case 'universal':
      return assemblePrompt(params);

    case 'midjourney': {
      const prompt = `${s.style}\n\n${s.subject}\n\n${s.composition}\n\n${s.colour}`;
      const noItems = s.exclusions.replace(/No /g, '').replace(/\. /g, ', ').replace(/\.$/, '');
      return `${prompt} --no ${noItems} --ar 4:3 --v 7 --style raw`;
    }

    case 'recraft': {
      return `Style: vector_illustration\n\n${s.style}\n\n${s.subject}\n\n${s.composition}\n\n${s.colour}\n\nNegative: ${s.exclusions}`;
    }

    case 'freepik': {
      // Shorter, optimized for Freepik's Flux/Nano Banana models
      const shortStyle = params.detailLevel && params.detailLevel < 80
        ? s.style
        : 'Hand-drawn editorial ink illustration, gestural brushpen linework, black ink on white, variable line weight, organic imperfect lines, Monocle/New Yorker editorial style.';
      return `${shortStyle}\n\n${s.subject}\n\n${s.composition}\n\n${s.colour}`;
    }

    case 'dalle': {
      // Natural language, conversational style for ChatGPT/DALL-E
      return `Create a hand-drawn editorial ink illustration in the style of Monocle magazine or The New Yorker. Use confident, gestural brushpen linework with black ink on white paper. The line weight should vary — heavier on outer contours, lighter on interior details. Lines should be organic and slightly imperfect, like a skilled illustrator using a Pentel Pocket Brush Pen.\n\n${s.subject}\n\n${s.composition}\n\n${s.colour}\n\nIMPORTANT: ${s.exclusions}`;
    }

    case 'stable_diffusion': {
      // Prompt + separate negative prompt
      const positive = `${s.style}\n\n${s.subject}\n\n${s.composition}\n\n${s.colour}`;
      return `POSITIVE PROMPT:\n${positive}\n\nNEGATIVE PROMPT:\n${s.exclusions}`;
    }

    default:
      return assemblePrompt(params);
  }
}
