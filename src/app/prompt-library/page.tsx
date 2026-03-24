'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Check, FileText, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import {
  getStyleDefinitions,
  saveStyleDefinition,
} from '@/lib/store';
import { DEFAULT_STYLE_BLOCK, DEFAULT_EXCLUSIONS_BLOCK, SUBJECT_SUGGESTIONS } from '@/lib/constants';
import type { StyleDefinition } from '@/types/database';

export default function PromptLibraryPage() {
  const [definitions, setDefinitions] = useState<StyleDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDef, setEditDef] = useState<StyleDefinition | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [activeTab, setActiveTab] = useState<'definitions' | 'subjects'>('definitions');

  const loadData = useCallback(async () => {
    const data = await getStyleDefinitions();
    setDefinitions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async () => {
    if (!editDef) return;
    // Deactivate others if this one is active
    if (editDef.is_active) {
      for (const d of definitions) {
        if (d.id !== editDef.id && d.is_active) {
          await saveStyleDefinition({ ...d, is_active: false });
        }
      }
    }
    await saveStyleDefinition(editDef);
    setEditDef(null);
    setIsNew(false);
    await loadData();
  };

  const openNew = () => {
    setIsNew(true);
    setEditDef({
      id: uuidv4(),
      version: `v${definitions.length + 1}`,
      style_block: DEFAULT_STYLE_BLOCK,
      exclusions_block: DEFAULT_EXCLUSIONS_BLOCK,
      is_active: false,
      created_at: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Prompt Library</h1>
          <p className="text-ink-400 mt-1">Style definitions, exclusions, and subject presets</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={16} /> New Version
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-ink-900 border border-ink-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('definitions')}
          className={`px-4 py-2 rounded-md text-sm transition cursor-pointer ${
            activeTab === 'definitions'
              ? 'bg-ink-700 text-white'
              : 'text-ink-400 hover:text-ink-200'
          }`}
        >
          <FileText size={14} className="inline mr-1.5" />
          Style Definitions
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-4 py-2 rounded-md text-sm transition cursor-pointer ${
            activeTab === 'subjects'
              ? 'bg-ink-700 text-white'
              : 'text-ink-400 hover:text-ink-200'
          }`}
        >
          <History size={14} className="inline mr-1.5" />
          Subject Library
        </button>
      </div>

      {activeTab === 'definitions' ? (
        loading ? (
          <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
        ) : (
          <div className="space-y-4">
            {definitions.map((def) => (
              <div
                key={def.id}
                className={`bg-ink-900 border rounded-xl p-5 transition-all ${
                  def.is_active ? 'border-amber/50' : 'border-ink-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{def.version}</h3>
                    {def.is_active && <Badge variant="amber">Active</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-ink-600">
                      {new Date(def.created_at).toLocaleDateString()}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsNew(false);
                        setEditDef({ ...def });
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1">
                      Style Block
                    </p>
                    <pre className="text-xs text-ink-400 bg-ink-950 rounded-lg p-3 overflow-auto max-h-32 whitespace-pre-wrap font-mono">
                      {def.style_block}
                    </pre>
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1">
                      Exclusions
                    </p>
                    <pre className="text-xs text-ink-400 bg-ink-950 rounded-lg p-3 overflow-auto max-h-20 whitespace-pre-wrap font-mono">
                      {def.exclusions_block}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Subject Library */
        <div className="space-y-6">
          {Object.entries(SUBJECT_SUGGESTIONS).map(([category, subjects]) => (
            <div key={category} className="bg-ink-900 border border-ink-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white capitalize mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg text-xs bg-ink-800 text-ink-300 border border-ink-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        open={!!editDef}
        onClose={() => {
          setEditDef(null);
          setIsNew(false);
        }}
        title={isNew ? 'New Style Version' : `Edit ${editDef?.version}`}
        className="max-w-2xl"
      >
        {editDef && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-ink-400 uppercase tracking-wider mb-1.5">
                  Version
                </label>
                <input
                  type="text"
                  value={editDef.version}
                  onChange={(e) =>
                    setEditDef({ ...editDef, version: e.target.value })
                  }
                  className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-sm text-ink-100 focus:outline-none focus:ring-1 focus:ring-amber/50"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm text-ink-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editDef.is_active}
                    onChange={(e) =>
                      setEditDef({ ...editDef, is_active: e.target.checked })
                    }
                    className="rounded border-ink-600"
                  />
                  Active
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-400 uppercase tracking-wider mb-1.5">
                Style Block
              </label>
              <textarea
                value={editDef.style_block}
                onChange={(e) =>
                  setEditDef({ ...editDef, style_block: e.target.value })
                }
                rows={8}
                className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-xs text-ink-100 font-mono focus:outline-none focus:ring-1 focus:ring-amber/50 resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-400 uppercase tracking-wider mb-1.5">
                Exclusions Block
              </label>
              <textarea
                value={editDef.exclusions_block}
                onChange={(e) =>
                  setEditDef({ ...editDef, exclusions_block: e.target.value })
                }
                rows={4}
                className="w-full bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-xs text-ink-100 font-mono focus:outline-none focus:ring-1 focus:ring-amber/50 resize-y"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">
                <Check size={14} /> {isNew ? 'Create Version' : 'Save Changes'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditDef(null);
                  setIsNew(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
