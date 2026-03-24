'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Pen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Upload,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ColourPicker } from '@/components/ui/colour-picker';
import { assemblePrompt } from '@/lib/prompt-engine';
import {
  INK_MODE_LABELS,
  INK_MODE_DESCRIPTIONS,
  VERTICAL_LABELS,
  COMPOSITION_LABELS,
  COMPOSITION_DESCRIPTIONS,
  SUBJECT_SUGGESTIONS,
} from '@/lib/constants';
import {
  getActivePalette,
  getActiveStyleDefinition,
  saveGeneration,
  uploadImage,
} from '@/lib/store';
import { getAvailableAdapters } from '@/lib/generation-adapters';
import type { InkMode, Vertical, Composition, Palette, Generation } from '@/types/database';

export default function GeneratorPage() {
  const [inkMode, setInkMode] = useState<InkMode>('single_register');
  const [vertical, setVertical] = useState<Vertical>('space');
  const [composition, setComposition] = useState<Composition>('environmental');
  const [subject, setSubject] = useState('');
  const [colour1, setColour1] = useState('#E8A317');
  const [colour2, setColour2] = useState('#E86A50');
  const [selectedModel, setSelectedModel] = useState('copy_prompt');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<Palette | null>(null);
  const [styleBlock, setStyleBlock] = useState('');
  const [exclusionsBlock, setExclusionsBlock] = useState('');
  const [subjectSuggestions, setSubjectSuggestions] = useState<string[]>([]);

  useEffect(() => {
    getActivePalette().then((p) => {
      if (p) {
        setPalette(p);
        setColour1(p.vertical_space_hex);
        setColour2(p.vertical_people_hex);
      }
    });
    getActiveStyleDefinition().then((s) => {
      if (s) {
        setStyleBlock(s.style_block);
        setExclusionsBlock(s.exclusions_block);
      }
    });
  }, []);

  // Update colour when vertical changes
  useEffect(() => {
    if (!palette) return;
    switch (vertical) {
      case 'space':
        setColour1(palette.vertical_space_hex);
        break;
      case 'people':
        setColour1(palette.vertical_people_hex);
        break;
      case 'tech':
        setColour1(palette.vertical_tech_hex);
        break;
    }
  }, [vertical, palette]);

  // Update subject suggestions
  useEffect(() => {
    const category = vertical === 'space' ? 'workspace' :
      vertical === 'tech' ? 'technology' :
      vertical === 'people' ? 'people' : '';
    setSubjectSuggestions(category ? (SUBJECT_SUGGESTIONS[category] || []) : []);
  }, [vertical]);

  const accentColours = inkMode === 'double_register' ? [colour1, colour2] : [colour1];

  const prompt = assemblePrompt({
    inkMode,
    vertical,
    composition,
    subject,
    accentColours,
    palette,
    styleBlock: styleBlock || undefined,
    exclusionsBlock: exclusionsBlock || undefined,
  });

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  const handleGenerate = async () => {
    const adapters = getAvailableAdapters();
    const adapter = adapters.find((a) => a.id === selectedModel);

    if (!adapter || adapter.id === 'copy_prompt') {
      await handleCopy();
      return;
    }

    setGenerating(true);
    setGeneratedImage(null);

    try {
      const imageUrl = await adapter.generate(prompt, exclusionsBlock);
      setGeneratedImage(imageUrl);

      const gen: Generation = {
        id: uuidv4(),
        prompt_full: prompt,
        prompt_version: 'v1',
        ink_mode: inkMode,
        vertical,
        composition,
        subject,
        accent_colours: accentColours,
        model: adapter.id,
        status: 'pending',
        feedback: null,
        tags: [],
        image_url: imageUrl,
        source: 'generated',
        created_at: new Date().toISOString(),
      };
      await saveGeneration(gen);
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const imageUrl = await uploadImage(file);
    setGeneratedImage(imageUrl);

    const gen: Generation = {
      id: uuidv4(),
      prompt_full: prompt,
      prompt_version: 'v1',
      ink_mode: inkMode,
      vertical,
      composition,
      subject,
      accent_colours: accentColours,
      model: 'manual_upload',
      status: 'pending',
      feedback: null,
      tags: [],
      image_url: imageUrl,
      source: 'uploaded',
      created_at: new Date().toISOString(),
    };
    await saveGeneration(gen);
  };

  const adapters = getAvailableAdapters();

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-white">Generator</h1>
        <p className="text-ink-400 mt-1">Assemble prompts using The Ink Register style system</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8">
        {/* Left Panel — Controls */}
        <div className="space-y-6">
          {/* Ink Mode */}
          <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-medium text-ink-400 uppercase tracking-wider flex items-center gap-2">
              <Pen size={14} /> Ink Mode
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(INK_MODE_LABELS) as InkMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInkMode(mode)}
                  className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                    inkMode === mode
                      ? 'bg-ink-800 border-amber/50 text-white'
                      : 'bg-ink-900 border-ink-700 text-ink-400 hover:border-ink-600'
                  }`}
                >
                  <p className="text-xs font-medium">{INK_MODE_LABELS[mode]}</p>
                  <p className="text-[10px] text-ink-500 mt-0.5 line-clamp-2">
                    {INK_MODE_DESCRIPTIONS[mode]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Vertical & Composition */}
          <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-4">
            <Select
              label="Vertical"
              value={vertical}
              onChange={(e) => setVertical(e.target.value as Vertical)}
              options={Object.entries(VERTICAL_LABELS).map(([v, l]) => ({ value: v, label: l }))}
            />
            <Select
              label="Composition"
              value={composition}
              onChange={(e) => setComposition(e.target.value as Composition)}
              options={Object.entries(COMPOSITION_LABELS).map(([v, l]) => ({ value: v, label: l }))}
            />
            <p className="text-[11px] text-ink-500 italic">
              {COMPOSITION_DESCRIPTIONS[composition]}
            </p>
          </div>

          {/* Colours */}
          {inkMode !== 'pure_ink' && (
            <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-4">
              <h2 className="text-xs font-medium text-ink-400 uppercase tracking-wider">
                Accent Colours
              </h2>
              <ColourPicker
                label="Primary"
                value={colour1}
                onChange={setColour1}
              />
              {inkMode === 'double_register' && (
                <ColourPicker
                  label="Secondary"
                  value={colour2}
                  onChange={setColour2}
                />
              )}
              {palette && (
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setColour1(palette.vertical_space_hex)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] bg-ink-800 hover:bg-ink-700 transition cursor-pointer"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: palette.vertical_space_hex }}
                    />
                    {palette.vertical_space_name}
                  </button>
                  <button
                    onClick={() => setColour1(palette.vertical_people_hex)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] bg-ink-800 hover:bg-ink-700 transition cursor-pointer"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: palette.vertical_people_hex }}
                    />
                    {palette.vertical_people_name}
                  </button>
                  <button
                    onClick={() => setColour1(palette.vertical_tech_hex)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] bg-ink-800 hover:bg-ink-700 transition cursor-pointer"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: palette.vertical_tech_hex }}
                    />
                    {palette.vertical_tech_name}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Subject */}
          <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-medium text-ink-400 uppercase tracking-wider">Subject</h2>
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Describe the scene..."
              className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber/50 resize-none h-20"
            />
            {subjectSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {subjectSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className="px-2 py-1 rounded text-[10px] bg-ink-800 text-ink-400 hover:text-ink-200 hover:bg-ink-700 transition cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Model & Actions */}
          <div className="bg-ink-900 border border-ink-800 rounded-xl p-5 space-y-4">
            <Select
              label="Generation Model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              options={adapters.map((a) => ({ value: a.id, label: a.name }))}
            />

            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="flex-1"
              >
                {generating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : selectedModel === 'copy_prompt' ? (
                  <Copy size={16} />
                ) : (
                  <Sparkles size={16} />
                )}
                {generating
                  ? 'Generating...'
                  : selectedModel === 'copy_prompt'
                  ? 'Copy Prompt'
                  : 'Generate'}
              </Button>

              <label className="inline-flex">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                />
                <span
                  className="inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-150 cursor-pointer bg-ink-700 text-ink-100 hover:bg-ink-600 border border-ink-600 px-4 py-2 text-sm"
                  onClick={(e) => {
                    const input = (e.currentTarget as HTMLElement).parentElement?.querySelector('input[type=file]') as HTMLInputElement;
                    input?.click();
                  }}
                >
                  <Upload size={16} />
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Panel — Preview & Prompt */}
        <div className="space-y-6">
          {/* Generated Image Preview */}
          <div className="bg-ink-900 border border-ink-800 rounded-xl overflow-hidden">
            {generatedImage ? (
              <div className="relative">
                <img
                  src={generatedImage}
                  alt="Generated illustration"
                  className="w-full max-h-[600px] object-contain bg-white"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge variant="amber">{INK_MODE_LABELS[inkMode]}</Badge>
                  <Badge variant="cobalt">{COMPOSITION_LABELS[composition]}</Badge>
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] flex items-center justify-center bg-ink-900">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-ink-800 flex items-center justify-center">
                    <Pen size={24} className="text-ink-500" />
                  </div>
                  <div>
                    <p className="text-ink-400 text-sm">No illustration yet</p>
                    <p className="text-ink-600 text-xs mt-1">
                      Generate with an API or upload an image
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Assembled Prompt */}
          <div className="bg-ink-900 border border-ink-800 rounded-xl">
            <button
              onClick={() => setShowPrompt(!showPrompt)}
              className="w-full flex items-center justify-between px-5 py-3 cursor-pointer"
            >
              <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">
                Assembled Prompt
              </span>
              {showPrompt ? (
                <ChevronUp size={16} className="text-ink-500" />
              ) : (
                <ChevronDown size={16} className="text-ink-500" />
              )}
            </button>
            {showPrompt && (
              <div className="px-5 pb-4">
                <div className="relative">
                  <pre className="text-xs text-ink-300 bg-ink-950 rounded-lg p-4 overflow-auto max-h-80 whitespace-pre-wrap font-mono leading-relaxed">
                    {prompt}
                  </pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-ink-800 hover:bg-ink-700 transition text-ink-400 hover:text-ink-200 cursor-pointer"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-[10px] text-ink-600 mt-2">
                  {prompt.length} characters &middot; Click copy to use in external platforms
                </p>
              </div>
            )}
          </div>

          {/* Active Settings Summary */}
          <div className="bg-ink-900 border border-ink-800 rounded-xl p-5">
            <h3 className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-3">
              Current Configuration
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="amber">{INK_MODE_LABELS[inkMode]}</Badge>
              <Badge variant="coral">{VERTICAL_LABELS[vertical]}</Badge>
              <Badge variant="cobalt">{COMPOSITION_LABELS[composition]}</Badge>
              {subject && <Badge>{subject}</Badge>}
              {inkMode !== 'pure_ink' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-ink-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colour1 }} />
                  {colour1}
                </span>
              )}
              {inkMode === 'double_register' && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-ink-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colour2 }} />
                  {colour2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
