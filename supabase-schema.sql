-- INNOVA Ink Studio — Supabase Schema
-- Run this in your Supabase SQL editor to set up the database

-- Palettes table
CREATE TABLE IF NOT EXISTS palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  core_dark TEXT NOT NULL DEFAULT '#1C1C1E',
  core_light TEXT NOT NULL DEFAULT '#FAF7F2',
  vertical_space_name TEXT NOT NULL DEFAULT 'Amber',
  vertical_space_hex TEXT NOT NULL DEFAULT '#E8A317',
  vertical_people_name TEXT NOT NULL DEFAULT 'Coral',
  vertical_people_hex TEXT NOT NULL DEFAULT '#E86A50',
  vertical_tech_name TEXT NOT NULL DEFAULT 'Cobalt',
  vertical_tech_hex TEXT NOT NULL DEFAULT '#2B5EA7',
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generations table
CREATE TABLE IF NOT EXISTS generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_full TEXT NOT NULL,
  prompt_version TEXT NOT NULL DEFAULT 'v1',
  ink_mode TEXT NOT NULL CHECK (ink_mode IN ('pure_ink', 'single_register', 'double_register', 'tinted_mono')),
  vertical TEXT NOT NULL CHECK (vertical IN ('space', 'people', 'tech', 'master', 'custom')),
  composition TEXT NOT NULL CHECK (composition IN ('centered_vignette', 'environmental', 'isometric', 'cropped', 'grid')),
  subject TEXT NOT NULL DEFAULT '',
  accent_colours JSONB NOT NULL DEFAULT '[]',
  model TEXT NOT NULL DEFAULT 'manual_upload',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'uploaded' CHECK (source IN ('generated', 'uploaded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Style definitions table
CREATE TABLE IF NOT EXISTS style_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  style_block TEXT NOT NULL,
  exclusions_block TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default palette
INSERT INTO palettes (name, core_dark, core_light, vertical_space_name, vertical_space_hex, vertical_people_name, vertical_people_hex, vertical_tech_name, vertical_tech_hex, is_active)
VALUES ('The Meridian', '#1C1C1E', '#FAF7F2', 'Amber', '#E8A317', 'Coral', '#E86A50', 'Cobalt', '#2B5EA7', TRUE);

-- Insert default style definition
INSERT INTO style_definitions (version, style_block, exclusions_block, is_active)
VALUES (
  'v1',
  'Hand-drawn editorial ink illustration with confident, gestural brushpen linework. Black ink on white. Variable line weight: heavier on outer contours of bodies and furniture (3-4px equivalent), lighter on interior details like faces, fingers, and screen contents (1-1.5px equivalent). Lines are organic and slightly imperfect with occasional breaks where strokes trail off at edges — conveying editorial confidence, not sloppiness. Human figures have natural proportions (approximately 1:5.5 head-to-body ratio) with distinguishing hair as the primary identifier (wavy strokes, solid black mass, bun shape, short crop, curls). Faces include simple line-drawn eyes, small line nose, optional mouth. Hands are 3-4 finger gestural shorthand. Clothing drawn as contour silhouettes with minimal interior line. Furniture and objects drawn as outline only with no fill. Plants appear as quick leaf shapes in pots, always in black line. The quality of line suggests a Pentel Pocket Brush Pen or Faber-Castell Pitt Artist Pen on smooth paper. Not digitally perfect. Not wobbly. Confident and decisive, like an architect sketching on a napkin. The style feels like editorial illustration from Monocle magazine, The New Yorker, or WeWork — warm, confident, human, and deliberately not digitally perfect.',
  'No gradients. No drop shadows. No cast shadows. No glow effects. No 3D rendering. No photorealistic elements. No smooth digital vector linework. No uniform stroke width. No filled backgrounds or background colours behind the full scene. No detailed patterns on clothing. No detailed furniture textures. No text within the illustration unless specifically requested. No watermarks. The illustration must look hand-drawn, not digitally generated. Avoid symmetry. Avoid geometric precision in organic forms.',
  TRUE
);

-- Create storage bucket for illustrations
INSERT INTO storage.buckets (id, name, public) VALUES ('illustrations', 'illustrations', TRUE)
ON CONFLICT DO NOTHING;

-- Allow public read access to illustrations
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'illustrations');

-- Allow authenticated insert
CREATE POLICY "Allow uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'illustrations');

-- Enable RLS (optional — disable if using anon key without auth)
-- ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE style_definitions ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_generations_status ON generations(status);
CREATE INDEX IF NOT EXISTS idx_generations_ink_mode ON generations(ink_mode);
CREATE INDEX IF NOT EXISTS idx_generations_vertical ON generations(vertical);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);
