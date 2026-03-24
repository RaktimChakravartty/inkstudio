'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, Eye, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { getGenerations } from '@/lib/store';
import { INK_MODE_LABELS, VERTICAL_LABELS, COMPOSITION_LABELS } from '@/lib/constants';
import type { Generation } from '@/types/database';

export default function LibraryPage() {
  const [approved, setApproved] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);

  const loadData = useCallback(async () => {
    const data = await getGenerations();
    setApproved(data.filter((g) => g.status === 'approved'));
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDownloadAll = () => {
    approved.forEach((gen) => {
      const link = document.createElement('a');
      link.href = gen.image_url;
      link.download = `ink-${gen.ink_mode}-${gen.vertical}-${gen.id.slice(0, 8)}.png`;
      link.click();
    });
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Reference Library</h1>
          <p className="text-ink-400 mt-1">
            {approved.length} approved illustration{approved.length !== 1 ? 's' : ''} — the brand standard
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List size={14} /> : <Grid3X3 size={14} />}
            {viewMode === 'grid' ? 'List' : 'Grid'}
          </Button>
          {approved.length > 0 && (
            <Button variant="secondary" size="sm" onClick={handleDownloadAll}>
              <Download size={14} /> Download All
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-ink-500">Loading...</div>
      ) : approved.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-ink-400">No approved illustrations yet</p>
          <p className="text-ink-600 text-sm mt-1">
            Approve illustrations in the Gallery to add them here
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {approved.map((gen) => (
            <div
              key={gen.id}
              className="group cursor-pointer bg-ink-900 border border-ink-800 rounded-xl overflow-hidden hover:border-ink-600 transition-all"
              onClick={() => setSelectedGen(gen)}
            >
              <div className="aspect-square bg-white relative overflow-hidden">
                <img
                  src={gen.image_url}
                  alt={gen.subject}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Eye size={28} className="text-white" />
                </div>
              </div>
              <div className="p-3 flex flex-wrap gap-1">
                <Badge variant="amber">{INK_MODE_LABELS[gen.ink_mode]}</Badge>
                <Badge variant="cobalt">{VERTICAL_LABELS[gen.vertical]}</Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {approved.map((gen) => (
            <div
              key={gen.id}
              className="flex items-center gap-4 bg-ink-900 border border-ink-800 rounded-xl p-3 hover:border-ink-600 transition cursor-pointer"
              onClick={() => setSelectedGen(gen)}
            >
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img src={gen.image_url} alt={gen.subject} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{gen.subject || 'Untitled'}</p>
                <div className="flex gap-1 mt-1">
                  <Badge variant="amber">{INK_MODE_LABELS[gen.ink_mode]}</Badge>
                  <Badge>{COMPOSITION_LABELS[gen.composition]}</Badge>
                </div>
                <p className="text-[10px] text-ink-600 mt-1">
                  {new Date(gen.created_at).toLocaleDateString()}
                </p>
              </div>
              <a
                href={gen.image_url}
                download
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-ink-500 hover:text-ink-200 hover:bg-ink-800 transition"
              >
                <Download size={16} />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        open={!!selectedGen}
        onClose={() => setSelectedGen(null)}
        title="Reference Illustration"
        className="max-w-4xl"
      >
        {selectedGen && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedGen.image_url}
                alt={selectedGen.subject}
                className="w-full max-h-[600px] object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="amber">{INK_MODE_LABELS[selectedGen.ink_mode]}</Badge>
              <Badge variant="coral">{VERTICAL_LABELS[selectedGen.vertical]}</Badge>
              <Badge variant="cobalt">{COMPOSITION_LABELS[selectedGen.composition]}</Badge>
            </div>
            {selectedGen.subject && <p className="text-sm text-ink-300">{selectedGen.subject}</p>}
            <a href={selectedGen.image_url} download>
              <Button size="sm"><Download size={14} /> Download</Button>
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}
