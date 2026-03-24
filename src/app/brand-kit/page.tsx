'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Check, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColourPicker } from '@/components/ui/colour-picker';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import {
  getPalettes,
  savePalette,
  setActivePaletteId,
  deletePalette,
} from '@/lib/store';
import { DEFAULT_PALETTE } from '@/lib/constants';
import type { Palette } from '@/types/database';

function EmptyPalette(): Palette {
  return {
    id: uuidv4(),
    name: '',
    core_dark: '#1C1C1E',
    core_light: '#FAF7F2',
    vertical_space_name: 'Amber',
    vertical_space_hex: '#E8A317',
    vertical_people_name: 'Coral',
    vertical_people_hex: '#E86A50',
    vertical_tech_name: 'Cobalt',
    vertical_tech_hex: '#2B5EA7',
    is_active: false,
    created_at: new Date().toISOString(),
  };
}

export default function BrandKitPage() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPalette, setEditPalette] = useState<Palette | null>(null);
  const [isNew, setIsNew] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getPalettes();
    setPalettes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async () => {
    if (!editPalette || !editPalette.name.trim()) return;
    await savePalette(editPalette);
    setEditPalette(null);
    setIsNew(false);
    await loadData();
  };

  const handleSetActive = async (id: string) => {
    await setActivePaletteId(id);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deletePalette(id);
    await loadData();
  };

  const openNew = () => {
    setIsNew(true);
    setEditPalette(EmptyPalette());
  };

  const openEdit = (palette: Palette) => {
    setIsNew(false);
    setEditPalette({ ...palette });
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Brand Kit</h1>
          <p className="text-ink-400 mt-1">Manage colour palettes for The Ink Register</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={16} /> New Palette
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className={`bg-ink-900 border rounded-xl p-5 transition-all ${
                palette.is_active ? 'border-amber/50' : 'border-ink-800 hover:border-ink-600'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{palette.name}</h3>
                  {palette.is_active && <Badge variant="amber" className="mt-1">Active</Badge>}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(palette)}
                    className="p-1.5 rounded text-ink-500 hover:text-ink-200 hover:bg-ink-800 transition cursor-pointer"
                  >
                    <Edit3 size={14} />
                  </button>
                  {!palette.is_active && (
                    <button
                      onClick={() => handleDelete(palette.id)}
                      className="p-1.5 rounded text-ink-500 hover:text-red-400 hover:bg-ink-800 transition cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Core colours */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <p className="text-[10px] text-ink-500 uppercase mb-1">Dark</p>
                  <div
                    className="h-8 rounded-md border border-ink-700"
                    style={{ backgroundColor: palette.core_dark }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-ink-500 uppercase mb-1">Light</p>
                  <div
                    className="h-8 rounded-md border border-ink-700"
                    style={{ backgroundColor: palette.core_light }}
                  />
                </div>
              </div>

              {/* Vertical colours */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 text-center">
                  <div
                    className="h-10 rounded-md mb-1"
                    style={{ backgroundColor: palette.vertical_space_hex }}
                  />
                  <p className="text-[10px] text-ink-400">{palette.vertical_space_name}</p>
                  <p className="text-[9px] text-ink-600 font-mono">{palette.vertical_space_hex}</p>
                </div>
                <div className="flex-1 text-center">
                  <div
                    className="h-10 rounded-md mb-1"
                    style={{ backgroundColor: palette.vertical_people_hex }}
                  />
                  <p className="text-[10px] text-ink-400">{palette.vertical_people_name}</p>
                  <p className="text-[9px] text-ink-600 font-mono">{palette.vertical_people_hex}</p>
                </div>
                <div className="flex-1 text-center">
                  <div
                    className="h-10 rounded-md mb-1"
                    style={{ backgroundColor: palette.vertical_tech_hex }}
                  />
                  <p className="text-[10px] text-ink-400">{palette.vertical_tech_name}</p>
                  <p className="text-[9px] text-ink-600 font-mono">{palette.vertical_tech_hex}</p>
                </div>
              </div>

              {!palette.is_active && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleSetActive(palette.id)}
                >
                  <Check size={14} /> Set Active
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      <Modal
        open={!!editPalette}
        onClose={() => {
          setEditPalette(null);
          setIsNew(false);
        }}
        title={isNew ? 'New Palette' : 'Edit Palette'}
        className="max-w-lg"
      >
        {editPalette && (
          <div className="space-y-5">
            <Input
              label="Palette Name"
              value={editPalette.name}
              onChange={(e) =>
                setEditPalette({ ...editPalette, name: e.target.value })
              }
              placeholder="e.g., The Meridian"
            />

            <div className="grid grid-cols-2 gap-4">
              <ColourPicker
                label="Core Dark"
                value={editPalette.core_dark}
                onChange={(v) =>
                  setEditPalette({ ...editPalette, core_dark: v })
                }
              />
              <ColourPicker
                label="Core Light"
                value={editPalette.core_light}
                onChange={(v) =>
                  setEditPalette({ ...editPalette, core_light: v })
                }
              />
            </div>

            <div className="border-t border-ink-800 pt-4">
              <p className="text-xs font-medium text-ink-400 uppercase tracking-wider mb-3">
                Vertical Colours
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 items-end">
                  <Input
                    label="Space Name"
                    value={editPalette.vertical_space_name}
                    onChange={(e) =>
                      setEditPalette({
                        ...editPalette,
                        vertical_space_name: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <ColourPicker
                    value={editPalette.vertical_space_hex}
                    onChange={(v) =>
                      setEditPalette({
                        ...editPalette,
                        vertical_space_hex: v,
                      })
                    }
                  />
                </div>
                <div className="flex gap-3 items-end">
                  <Input
                    label="People Name"
                    value={editPalette.vertical_people_name}
                    onChange={(e) =>
                      setEditPalette({
                        ...editPalette,
                        vertical_people_name: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <ColourPicker
                    value={editPalette.vertical_people_hex}
                    onChange={(v) =>
                      setEditPalette({
                        ...editPalette,
                        vertical_people_hex: v,
                      })
                    }
                  />
                </div>
                <div className="flex gap-3 items-end">
                  <Input
                    label="Tech Name"
                    value={editPalette.vertical_tech_name}
                    onChange={(e) =>
                      setEditPalette({
                        ...editPalette,
                        vertical_tech_name: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <ColourPicker
                    value={editPalette.vertical_tech_hex}
                    onChange={(v) =>
                      setEditPalette({
                        ...editPalette,
                        vertical_tech_hex: v,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">
                {isNew ? 'Create Palette' : 'Save Changes'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditPalette(null);
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
