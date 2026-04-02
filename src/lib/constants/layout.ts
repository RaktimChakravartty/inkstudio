export type ApplicationType = 'hoarding' | 'social_square' | 'social_story' | 'linkedin_banner' | 'a4_portrait' | 'a4_landscape' | 'presentation' | 'web_banner' | 'business_card' | 'letterhead' | 'email_sig';
export type LayoutTemplate = 'hero' | 'content' | 'data' | 'social' | 'minimal';
export type LayoutVertical = 'space' | 'people' | 'tech' | 'master';
export type LayoutBg = 'ivory' | 'charcoal' | 'white' | 'vertical';

const B = { charcoal: '#191919', text: '#221F20', ivory: '#FAF7F3', mist: '#E8E4DF', cinnamon: '#D4772E', twilight: '#2D4272', hunter: '#3D6B4F', white: '#FFFFFF' };

export interface FormatSpec {
  label: string;
  width: number; height: number; unit: 'px' | 'mm';
  orientation: 'portrait' | 'landscape' | 'square';
  bleed: string;
  margins: { top: number; bottom: number; left: number; right: number };
  columns: number; gutter: number;
  spaceBase: number;
  typo: { display: string; heading: string; body: string; label: string };
  wordmark: { placement: string; minWidth: string; clearSpace: string };
  quietZone: string;
}

export const FORMATS: Record<ApplicationType, FormatSpec> = {
  hoarding: {
    label: 'Hoarding / Billboard (3000×6000mm)', width: 3000, height: 6000, unit: 'mm', orientation: 'portrait', bleed: '3mm all sides',
    margins: { top: 80, bottom: 80, left: 80, right: 80 }, columns: 12, gutter: 20,
    spaceBase: 4, typo: { display: 'Fraunces 120pt', heading: 'DM Sans Bold 48pt', body: 'DM Sans 48pt', label: 'Space Mono 36pt' },
    wordmark: { placement: 'Bottom-left', minWidth: '400mm', clearSpace: 'Equal to x-height on all sides' }, quietZone: '35% for photography base',
  },
  social_square: {
    label: 'Social Post (1080×1080px)', width: 1080, height: 1080, unit: 'px', orientation: 'square', bleed: 'none',
    margins: { top: 80, bottom: 80, left: 80, right: 80 }, columns: 12, gutter: 16,
    spaceBase: 16, typo: { display: 'Fraunces 64px', heading: 'DM Sans Bold 32px', body: 'DM Sans 28px', label: 'Space Mono 18px' },
    wordmark: { placement: 'Bottom-left or centred', minWidth: '200px', clearSpace: 'x-height' }, quietZone: '20% margins',
  },
  social_story: {
    label: 'Social Story (1080×1920px)', width: 1080, height: 1920, unit: 'px', orientation: 'portrait', bleed: 'none',
    margins: { top: 120, bottom: 160, left: 60, right: 60 }, columns: 12, gutter: 16,
    spaceBase: 16, typo: { display: 'Fraunces 56px', heading: 'DM Sans Bold 28px', body: 'DM Sans 24px', label: 'Space Mono 16px' },
    wordmark: { placement: 'Top-left or bottom-centre', minWidth: '180px', clearSpace: 'x-height' }, quietZone: 'Bottom 30% text overlay zone',
  },
  linkedin_banner: {
    label: 'LinkedIn Banner (1584×396px)', width: 1584, height: 396, unit: 'px', orientation: 'landscape', bleed: 'none',
    margins: { top: 32, bottom: 32, left: 48, right: 48 }, columns: 12, gutter: 16,
    spaceBase: 16, typo: { display: 'Fraunces 48px', heading: 'DM Sans Bold 24px', body: 'DM Sans 18px', label: 'Space Mono 14px' },
    wordmark: { placement: 'Left-centre', minWidth: '140px', clearSpace: 'x-height' }, quietZone: '25% right side for profile photo overlap',
  },
  a4_portrait: {
    label: 'A4 Portrait Print', width: 210, height: 297, unit: 'mm', orientation: 'portrait', bleed: '3mm all sides',
    margins: { top: 25, bottom: 20, left: 20, right: 20 }, columns: 12, gutter: 5,
    spaceBase: 4, typo: { display: 'Fraunces 24pt', heading: 'DM Sans Bold 12pt', body: 'DM Sans 10pt/14pt', label: 'Space Mono 7pt' },
    wordmark: { placement: 'Top-left', minWidth: '35mm', clearSpace: 'x-height' }, quietZone: '15% minimum',
  },
  a4_landscape: {
    label: 'A4 Landscape (Guidelines)', width: 297, height: 210, unit: 'mm', orientation: 'landscape', bleed: '3mm all sides',
    margins: { top: 35, bottom: 35, left: 20, right: 20 }, columns: 12, gutter: 5,
    spaceBase: 4, typo: { display: 'Fraunces 18pt', heading: 'DM Sans Bold 10pt', body: 'DM Sans 10pt/14pt', label: 'Space Mono 7pt' },
    wordmark: { placement: 'Top-left', minWidth: '30mm', clearSpace: 'x-height' }, quietZone: '35% text left, 60% visual right',
  },
  presentation: {
    label: 'Presentation (1920×1080px)', width: 1920, height: 1080, unit: 'px', orientation: 'landscape', bleed: 'none',
    margins: { top: 60, bottom: 60, left: 80, right: 80 }, columns: 12, gutter: 20,
    spaceBase: 16, typo: { display: 'Fraunces 48px', heading: 'DM Sans Bold 32px', body: 'DM Sans 24px', label: 'Space Mono 16px' },
    wordmark: { placement: 'Top-left', minWidth: '180px', clearSpace: 'x-height' }, quietZone: '10% all sides',
  },
  web_banner: {
    label: 'Web Banner (1440×600px)', width: 1440, height: 600, unit: 'px', orientation: 'landscape', bleed: 'none',
    margins: { top: 48, bottom: 48, left: 64, right: 64 }, columns: 12, gutter: 20,
    spaceBase: 16, typo: { display: 'Fraunces 56px', heading: 'DM Sans Bold 28px', body: 'DM Sans 20px', label: 'Space Mono 14px' },
    wordmark: { placement: 'Top-left or centred', minWidth: '160px', clearSpace: 'x-height' }, quietZone: '20% vertical margins',
  },
  business_card: {
    label: 'Business Card (90×55mm)', width: 90, height: 55, unit: 'mm', orientation: 'landscape', bleed: '3mm all sides',
    margins: { top: 5, bottom: 5, left: 5, right: 5 }, columns: 4, gutter: 3,
    spaceBase: 2, typo: { display: 'DM Sans 500 9pt', heading: 'DM Sans 400 7.5pt', body: 'Space Mono 6.5pt', label: 'Space Mono 6pt' },
    wordmark: { placement: 'Top-left front, centred back', minWidth: '30mm', clearSpace: 'x-height' }, quietZone: 'Vertical accent bar bottom 2mm',
  },
  letterhead: {
    label: 'Letterhead (A4)', width: 210, height: 297, unit: 'mm', orientation: 'portrait', bleed: 'none',
    margins: { top: 35, bottom: 25, left: 25, right: 25 }, columns: 1, gutter: 0,
    spaceBase: 4, typo: { display: 'DM Sans 500 11pt', heading: 'DM Sans 700 9pt', body: 'DM Sans 400 10pt/14pt', label: 'Space Mono 7pt' },
    wordmark: { placement: 'Top-left', minWidth: '35mm', clearSpace: 'x-height' }, quietZone: 'Header 35mm, footer 25mm',
  },
  email_sig: {
    label: 'Email Signature (600×200px)', width: 600, height: 200, unit: 'px', orientation: 'landscape', bleed: 'none',
    margins: { top: 16, bottom: 16, left: 16, right: 16 }, columns: 1, gutter: 0,
    spaceBase: 8, typo: { display: 'DM Sans Bold 14pt', heading: 'DM Sans 400 12pt', body: 'DM Sans 400 11pt', label: 'Space Mono 8pt' },
    wordmark: { placement: 'Right side', minWidth: '60px', clearSpace: 'x-height' }, quietZone: 'Divider line in vertical colour',
  },
};

export function getAccentColour(vertical: LayoutVertical): string {
  switch (vertical) {
    case 'space': return B.cinnamon;
    case 'people': return B.twilight;
    case 'tech': return B.hunter;
    case 'master': return B.charcoal;
  }
}

export function getBgColour(bg: LayoutBg, vertical: LayoutVertical): string {
  switch (bg) {
    case 'ivory': return B.ivory;
    case 'charcoal': return B.charcoal;
    case 'white': return B.white;
    case 'vertical': return getAccentColour(vertical);
  }
}

export function generateCSS(format: FormatSpec, bg: LayoutBg, vertical: LayoutVertical): string {
  const u = format.unit === 'px' ? 'px' : 'mm';
  const accent = getAccentColour(vertical);
  const bgC = getBgColour(bg, vertical);
  const textC = (bg === 'charcoal' || bg === 'vertical') ? B.ivory : B.text;
  return `:root {
  /* Grid */
  --grid-columns: ${format.columns};
  --grid-gutter: ${format.gutter}${u};
  --margin-top: ${format.margins.top}${u};
  --margin-bottom: ${format.margins.bottom}${u};
  --margin-left: ${format.margins.left}${u};
  --margin-right: ${format.margins.right}${u};

  /* Spacing */
  --space-base: ${format.spaceBase}${u};
  --space-2: ${format.spaceBase * 2}${u};
  --space-3: ${format.spaceBase * 3}${u};
  --space-4: ${format.spaceBase * 4}${u};
  --space-6: ${format.spaceBase * 6}${u};
  --space-8: ${format.spaceBase * 8}${u};
  --space-12: ${format.spaceBase * 12}${u};

  /* Colour */
  --color-bg: ${bgC};
  --color-text: ${textC};
  --color-accent: ${accent};
  --color-mist: ${B.mist};

  /* Typography */
  --font-display: 'Fraunces', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'Space Mono', monospace;
}`;
}
