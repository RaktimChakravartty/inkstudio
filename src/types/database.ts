export type InkMode = 'pure_ink' | 'single_register' | 'double_register' | 'tinted_mono';
export type Vertical = 'space' | 'people' | 'tech' | 'master' | 'custom';
export type Composition = 'centered_vignette' | 'environmental' | 'isometric' | 'cropped' | 'grid';
export type GenerationStatus = 'pending' | 'approved' | 'rejected';
export type ImageSource = 'generated' | 'uploaded';

export interface Palette {
  id: string;
  name: string;
  core_dark: string;
  core_light: string;
  vertical_space_name: string;
  vertical_space_hex: string;
  vertical_people_name: string;
  vertical_people_hex: string;
  vertical_tech_name: string;
  vertical_tech_hex: string;
  is_active: boolean;
  created_at: string;
}

export interface Generation {
  id: string;
  prompt_full: string;
  prompt_version: string;
  ink_mode: InkMode;
  vertical: Vertical;
  composition: Composition;
  subject: string;
  accent_colours: string[];
  model: string;
  status: GenerationStatus;
  feedback: string | null;
  tags: string[];
  image_url: string;
  source: ImageSource;
  created_at: string;
}

export interface StyleDefinition {
  id: string;
  version: string;
  style_block: string;
  exclusions_block: string;
  is_active: boolean;
  created_at: string;
}

export interface Subject {
  id: string;
  category: string;
  description: string;
  created_at: string;
}
