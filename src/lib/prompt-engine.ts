import type { InkMode, Vertical, Composition } from '@/types/database';
import type { Palette } from '@/types/database';
import { DEFAULT_STYLE_BLOCK, DEFAULT_EXCLUSIONS_BLOCK, COMPOSITION_DESCRIPTIONS } from './constants';

interface PromptParams {
  inkMode: InkMode;
  vertical: Vertical;
  composition: Composition;
  subject: string;
  accentColours: string[];
  palette: Palette | null;
  styleBlock?: string;
  exclusionsBlock?: string;
}

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

function getCompositionDirective(comp: Composition): string {
  return COMPOSITION_DESCRIPTIONS[comp];
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
      return '';
    case 'custom':
      return '';
  }
}

export function assemblePrompt(params: PromptParams): string {
  const {
    inkMode,
    vertical,
    composition,
    subject,
    accentColours,
    palette,
    styleBlock = DEFAULT_STYLE_BLOCK,
    exclusionsBlock = DEFAULT_EXCLUSIONS_BLOCK,
  } = params;

  const parts: string[] = [];

  // Style definition (always first)
  parts.push(styleBlock);

  // Ink mode directive
  parts.push(getInkModeDirective(inkMode, accentColours, palette));

  // Composition
  parts.push(`Composition: ${getCompositionDirective(composition)}`);

  // Vertical context
  const verticalCtx = getVerticalContext(vertical);
  if (verticalCtx) {
    parts.push(verticalCtx);
  }

  // Subject
  if (subject.trim()) {
    parts.push(`Subject: ${subject.trim()}`);
  }

  // Exclusions (always last)
  parts.push(`NEGATIVE: ${exclusionsBlock}`);

  return parts.join('\n\n');
}
