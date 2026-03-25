'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Check, FileText, BookOpen, Save, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { getStyleDefinitions, saveStyleDefinition } from '@/lib/store';
import { DEFAULT_STYLE_BLOCK, DEFAULT_EXCLUSIONS_BLOCK, SUBJECT_SUGGESTIONS } from '@/lib/constants';
import type { StyleDefinition } from '@/types/database';

export default function PromptLibraryPage() {
  const [definitions, setDefinitions] = useState<StyleDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'definitions' | 'subjects'>('definitions');

  // Inline editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStyle, setEditStyle] = useState('');
  const [editExclusions, setEditExclusions] = useState('');
  const [saving, setSaving] = useState(false);

  // New version modal
  const [showNewModal, setShowNewModal] = useState(false);
  const [newVersion, setNewVersion] = useState('');

  // Subject CRUD
  const [customSubjects, setCustomSubjects] = useState<Record<string, string[]>>({});
  const [newSubjectCategory, setNewSubjectCategory] = useState('');
  const [newSubjectText, setNewSubjectText] = useState('');

  const loadData = useCallback(async () => {
    const data = await getStyleDefinitions();
    setDefinitions(data);
    setLoading(false);

    // Load custom subjects
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ink_custom_subjects');
      if (saved) setCustomSubjects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const startEditing = (def: StyleDefinition) => {
    setEditingId(def.id);
    setEditStyle(def.style_block);
    setEditExclusions(def.exclusions_block);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditStyle('');
    setEditExclusions('');
  };

  const handleSaveInline = async (def: StyleDefinition) => {
    setSaving(true);
    await saveStyleDefinition({ ...def, style_block: editStyle, exclusions_block: editExclusions });
    setEditingId(null);
    setSaving(false);
    await loadData();
  };

  const handleActivate = async (def: StyleDefinition) => {
    // Deactivate all others
    for (const d of definitions) {
      if (d.id !== def.id && d.is_active) {
        await saveStyleDefinition({ ...d, is_active: false });
      }
    }
    await saveStyleDefinition({ ...def, is_active: true });
    await loadData();
  };

  const handleCreateVersion = async () => {
    if (!newVersion.trim()) return;
    const activeDef = definitions.find((d) => d.is_active) || definitions[0];
    await saveStyleDefinition({
      id: uuidv4(),
      version: newVersion,
      style_block: activeDef?.style_block || DEFAULT_STYLE_BLOCK,
      exclusions_block: activeDef?.exclusions_block || DEFAULT_EXCLUSIONS_BLOCK,
      is_active: false,
      created_at: new Date().toISOString(),
    });
    setShowNewModal(false);
    setNewVersion('');
    await loadData();
  };

  // Subject CRUD
  const addSubject = () => {
    if (!newSubjectCategory.trim() || !newSubjectText.trim()) return;
    const cat = newSubjectCategory.toLowerCase();
    const updated = { ...customSubjects };
    if (!updated[cat]) updated[cat] = [];
    if (!updated[cat].includes(newSubjectText)) {
      updated[cat].push(newSubjectText);
    }
    setCustomSubjects(updated);
    localStorage.setItem('ink_custom_subjects', JSON.stringify(updated));
    setNewSubjectText('');
  };

  const removeSubject = (cat: string, subject: string) => {
    const updated = { ...customSubjects };
    updated[cat] = (updated[cat] || []).filter((s) => s !== subject);
    if (updated[cat].length === 0) delete updated[cat];
    setCustomSubjects(updated);
    localStorage.setItem('ink_custom_subjects', JSON.stringify(updated));
  };

  const allSubjects = { ...SUBJECT_SUGGESTIONS, ...customSubjects };

  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink-50">Prompt Library</h1>
          <p className="text-ink-500 text-sm mt-0.5">Style definitions, exclusions, and subject presets</p>
        </div>
        <Button onClick={() => setShowNewModal(true)}>
          <Plus size={16} /> New Version
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-ink-900 border border-ink-700 rounded-lg p-1 w-fit">
        <button onClick={() => setActiveTab('definitions')} className={`px-4 py-2 rounded-md text-sm transition cursor-pointer flex items-center gap-1.5 ${activeTab === 'definitions' ? 'bg-ink-800 text-ink-50' : 'text-ink-400 hover:text-ink-200'}`}>
          <FileText size={14} /> Style Definitions
        </button>
        <button onClick={() => setActiveTab('subjects')} className={`px-4 py-2 rounded-md text-sm transition cursor-pointer flex items-center gap-1.5 ${activeTab === 'subjects' ? 'bg-ink-800 text-ink-50' : 'text-ink-400 hover:text-ink-200'}`}>
          <BookOpen size={14} /> Subject Library
        </button>
      </div>

      {activeTab === 'definitions' ? (
        loading ? (
          <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
        ) : (
          <div className="space-y-4">
            {definitions.map((def) => {
              const isEditing = editingId === def.id;
              return (
                <div key={def.id} className={`bg-ink-900 border rounded-xl p-5 transition-all ${def.is_active ? 'border-amber/50' : 'border-ink-700'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-ink-50">{def.version}</h3>
                      {def.is_active && <Badge variant="amber">Active</Badge>}
                      <span className="text-[10px] text-ink-600">{new Date(def.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <Button size="sm" onClick={() => handleSaveInline(def)} disabled={saving}>
                            <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={cancelEditing}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => startEditing(def)}>Edit</Button>
                          {!def.is_active && (
                            <Button variant="secondary" size="sm" onClick={() => handleActivate(def)}>
                              <Check size={14} /> Activate
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1.5 font-semibold">Style Block</p>
                      {isEditing ? (
                        <textarea
                          value={editStyle}
                          onChange={(e) => setEditStyle(e.target.value)}
                          rows={6}
                          className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[11px] text-ink-200 font-mono focus:outline-none focus:ring-1 focus:ring-amber/50 resize-y leading-relaxed"
                        />
                      ) : (
                        <pre className="text-[11px] text-ink-300 bg-ink-950 rounded-lg p-3 overflow-auto max-h-32 whitespace-pre-wrap font-mono leading-relaxed">{def.style_block}</pre>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1.5 font-semibold">Exclusions</p>
                      {isEditing ? (
                        <textarea
                          value={editExclusions}
                          onChange={(e) => setEditExclusions(e.target.value)}
                          rows={3}
                          className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-[11px] text-ink-200 font-mono focus:outline-none focus:ring-1 focus:ring-amber/50 resize-y leading-relaxed"
                        />
                      ) : (
                        <pre className="text-[11px] text-ink-300 bg-ink-950 rounded-lg p-3 overflow-auto max-h-20 whitespace-pre-wrap font-mono leading-relaxed">{def.exclusions_block}</pre>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Subject Library */
        <div className="space-y-6">
          {/* Add new subject */}
          <div className="bg-ink-900 border border-ink-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-ink-100 mb-3">Add Custom Subject</h3>
            <div className="flex gap-2">
              <Input
                value={newSubjectCategory}
                onChange={(e) => setNewSubjectCategory(e.target.value)}
                placeholder="Category (e.g., events)"
                className="w-40"
              />
              <Input
                value={newSubjectText}
                onChange={(e) => setNewSubjectText(e.target.value)}
                placeholder="Subject description..."
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && addSubject()}
              />
              <Button onClick={addSubject} size="md"><Plus size={14} /> Add</Button>
            </div>
          </div>

          {Object.entries(allSubjects).map(([category, subjects]) => (
            <div key={category} className="bg-ink-900 border border-ink-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-ink-100 capitalize">{category}</h3>
                <span className="text-[10px] text-ink-500">{subjects.length} subjects</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <div key={s} className="group flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-ink-800 text-ink-300 border border-ink-700 hover:border-ink-600 transition">
                    <span>{s}</span>
                    <a href={`/?subject=${encodeURIComponent(s)}`} className="text-ink-600 hover:text-amber transition" title="Use in Generator">
                      <ArrowRight size={11} />
                    </a>
                    {customSubjects[category]?.includes(s) && (
                      <button onClick={() => removeSubject(category, s)} className="text-ink-600 hover:text-red-400 transition cursor-pointer" title="Remove">
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Version Modal */}
      <Modal open={showNewModal} onClose={() => setShowNewModal(false)} title="Create New Style Version">
        <div className="space-y-4">
          <Input
            label="Version Name"
            value={newVersion}
            onChange={(e) => setNewVersion(e.target.value)}
            placeholder="e.g., v2-refined"
            onKeyDown={(e) => e.key === 'Enter' && handleCreateVersion()}
          />
          <p className="text-xs text-ink-500">
            Creates a copy of the currently active style definition. Edit it after creation.
          </p>
          <div className="flex gap-2">
            <Button onClick={handleCreateVersion} className="flex-1">Create Version</Button>
            <Button variant="ghost" onClick={() => setShowNewModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
