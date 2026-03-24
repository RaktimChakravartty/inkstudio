'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Check,
  X,
  Tag,
  Download,
  Trash2,
  Eye,
  Filter,
  SortAsc,
  SortDesc,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import {
  getGenerations,
  updateGenerationStatus,
  updateGenerationTags,
  deleteGeneration,
} from '@/lib/store';
import {
  INK_MODE_LABELS,
  VERTICAL_LABELS,
  COMPOSITION_LABELS,
} from '@/lib/constants';
import type { Generation, InkMode, Vertical, GenerationStatus } from '@/types/database';

export default function GalleryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<InkMode | 'all'>('all');
  const [filterVertical, setFilterVertical] = useState<Vertical | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<GenerationStatus | 'all'>('all');
  const [sortNewest, setSortNewest] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);
  const [tagModalGen, setTagModalGen] = useState<Generation | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getGenerations();
    setGenerations(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filtered = generations
    .filter((g) => filterMode === 'all' || g.ink_mode === filterMode)
    .filter((g) => filterVertical === 'all' || g.vertical === filterVertical)
    .filter((g) => filterStatus === 'all' || g.status === filterStatus)
    .filter(
      (g) =>
        !searchQuery ||
        g.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) =>
      sortNewest
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

  const handleStatus = async (id: string, status: GenerationStatus) => {
    await updateGenerationStatus(id, status);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deleteGeneration(id);
    await loadData();
    setSelectedGen(null);
  };

  const handleAddTag = async () => {
    if (!tagModalGen || !tagInput.trim()) return;
    const newTags = [...new Set([...tagModalGen.tags, tagInput.trim()])];
    await updateGenerationTags(tagModalGen.id, newTags);
    setTagInput('');
    await loadData();
    setTagModalGen((prev) =>
      prev ? { ...prev, tags: newTags } : null
    );
  };

  const handleRemoveTag = async (tag: string) => {
    if (!tagModalGen) return;
    const newTags = tagModalGen.tags.filter((t) => t !== tag);
    await updateGenerationTags(tagModalGen.id, newTags);
    await loadData();
    setTagModalGen((prev) =>
      prev ? { ...prev, tags: newTags } : null
    );
  };

  const statusColor = (s: GenerationStatus) => {
    switch (s) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'warning';
      default:
        return 'default';
    }
  };

  const verticalBadgeColor = (v: string) => {
    switch (v) {
      case 'space':
        return 'amber';
      case 'people':
        return 'coral';
      case 'tech':
        return 'cobalt';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Gallery</h1>
          <p className="text-ink-400 mt-1">
            {filtered.length} illustration{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-ink-800 border border-ink-700 rounded-lg pl-9 pr-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber/50 w-48"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} />
            Filters
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortNewest(!sortNewest)}
          >
            {sortNewest ? <SortDesc size={14} /> : <SortAsc size={14} />}
            {sortNewest ? 'Newest' : 'Oldest'}
          </Button>
        </div>
      </div>

      {/* Filters bar */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-ink-900 border border-ink-800 rounded-xl">
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as InkMode | 'all')}
            className="bg-ink-800 border border-ink-700 rounded-lg px-3 py-1.5 text-xs text-ink-100"
          >
            <option value="all">All Modes</option>
            {Object.entries(INK_MODE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <select
            value={filterVertical}
            onChange={(e) => setFilterVertical(e.target.value as Vertical | 'all')}
            className="bg-ink-800 border border-ink-700 rounded-lg px-3 py-1.5 text-xs text-ink-100"
          >
            <option value="all">All Verticals</option>
            {Object.entries(VERTICAL_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as GenerationStatus | 'all')}
            className="bg-ink-800 border border-ink-700 rounded-lg px-3 py-1.5 text-xs text-ink-100"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64 text-ink-500">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-ink-400">No illustrations yet</p>
          <p className="text-ink-600 text-sm mt-1">
            Generate or upload illustrations from the Generator page
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((gen) => (
            <div
              key={gen.id}
              className="group bg-ink-900 border border-ink-800 rounded-xl overflow-hidden hover:border-ink-600 transition-all"
            >
              {/* Image */}
              <div
                className="aspect-square bg-white cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedGen(gen)}
              >
                <img
                  src={gen.image_url}
                  alt={gen.subject || 'Illustration'}
                  className="w-full h-full object-contain"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Eye size={24} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="p-3 space-y-2">
                <div className="flex flex-wrap gap-1">
                  <Badge variant={verticalBadgeColor(gen.vertical) as 'amber' | 'coral' | 'cobalt' | 'default'}>
                    {VERTICAL_LABELS[gen.vertical] || gen.vertical}
                  </Badge>
                  <Badge>{INK_MODE_LABELS[gen.ink_mode]}</Badge>
                  <Badge variant={statusColor(gen.status)}>
                    {gen.status}
                  </Badge>
                </div>
                {gen.subject && (
                  <p className="text-xs text-ink-400 truncate">{gen.subject}</p>
                )}
                <p className="text-[10px] text-ink-600">
                  {new Date(gen.created_at).toLocaleDateString()} &middot;{' '}
                  {gen.source}
                </p>

                {/* Actions */}
                <div className="flex gap-1 pt-1">
                  <button
                    onClick={() => handleStatus(gen.id, 'approved')}
                    className={`p-1.5 rounded transition cursor-pointer ${
                      gen.status === 'approved'
                        ? 'bg-emerald-600/20 text-emerald-400'
                        : 'text-ink-500 hover:text-emerald-400 hover:bg-ink-800'
                    }`}
                    title="Approve"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => handleStatus(gen.id, 'rejected')}
                    className={`p-1.5 rounded transition cursor-pointer ${
                      gen.status === 'rejected'
                        ? 'bg-red-600/20 text-red-400'
                        : 'text-ink-500 hover:text-red-400 hover:bg-ink-800'
                    }`}
                    title="Reject"
                  >
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => setTagModalGen(gen)}
                    className="p-1.5 rounded text-ink-500 hover:text-amber hover:bg-ink-800 transition cursor-pointer"
                    title="Tag"
                  >
                    <Tag size={14} />
                  </button>
                  <a
                    href={gen.image_url}
                    download
                    className="p-1.5 rounded text-ink-500 hover:text-ink-200 hover:bg-ink-800 transition cursor-pointer"
                    title="Download"
                  >
                    <Download size={14} />
                  </a>
                  <button
                    onClick={() => handleDelete(gen.id)}
                    className="p-1.5 rounded text-ink-500 hover:text-red-400 hover:bg-ink-800 transition cursor-pointer ml-auto"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        open={!!selectedGen}
        onClose={() => setSelectedGen(null)}
        title="Illustration Detail"
        className="max-w-3xl"
      >
        {selectedGen && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedGen.image_url}
                alt={selectedGen.subject}
                className="w-full max-h-[500px] object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={verticalBadgeColor(selectedGen.vertical) as 'amber' | 'coral' | 'cobalt' | 'default'}>
                {VERTICAL_LABELS[selectedGen.vertical]}
              </Badge>
              <Badge>{INK_MODE_LABELS[selectedGen.ink_mode]}</Badge>
              <Badge>{COMPOSITION_LABELS[selectedGen.composition]}</Badge>
              <Badge variant={statusColor(selectedGen.status)}>{selectedGen.status}</Badge>
            </div>
            {selectedGen.subject && (
              <p className="text-sm text-ink-300">{selectedGen.subject}</p>
            )}
            {selectedGen.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedGen.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-ink-700 text-[10px] text-ink-300">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <details className="text-xs">
              <summary className="text-ink-400 cursor-pointer hover:text-ink-300">
                View prompt
              </summary>
              <pre className="mt-2 text-ink-400 bg-ink-950 rounded-lg p-3 overflow-auto max-h-48 whitespace-pre-wrap font-mono">
                {selectedGen.prompt_full}
              </pre>
            </details>
            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={() => handleStatus(selectedGen.id, 'approved')}>
                <Check size={14} /> Approve
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleStatus(selectedGen.id, 'rejected')}>
                <X size={14} /> Reject
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(selectedGen.id)}
                className="ml-auto"
              >
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Tag Modal */}
      <Modal
        open={!!tagModalGen}
        onClose={() => setTagModalGen(null)}
        title="Manage Tags"
      >
        {tagModalGen && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {tagModalGen.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-ink-700 text-xs text-ink-300"
                >
                  {t}
                  <button
                    onClick={() => handleRemoveTag(t)}
                    className="text-ink-500 hover:text-red-400 cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {tagModalGen.tags.length === 0 && (
                <p className="text-xs text-ink-500">No tags yet</p>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button size="md" onClick={handleAddTag}>
                Add
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
