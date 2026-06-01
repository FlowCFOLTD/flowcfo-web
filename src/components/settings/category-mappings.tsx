'use client';

import { useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Tag, ChevronDown } from 'lucide-react';
import { useCategoryMappingsStatus, useSaveCategoryMappings } from '@/hooks/api/use-category-mappings';
import type { CategoryMappingItem } from '@/lib/api/category-mappings';

const TARGET_OPTIONS = [
  { value: 'cogs', label: 'COGS (Cost of Goods Sold)' },
  { value: 'platform_fee', label: 'Platform Fees' },
  { value: 'revenue', label: 'Revenue' },
  { value: '_ignore', label: 'Ignore (do not map)' },
] as const;

export default function CategoryMappingsPanel() {
  const { data, isLoading, error } = useCategoryMappingsStatus();
  const saveMutation = useSaveCategoryMappings();
  const [localMappings, setLocalMappings] = useState<Record<string, string> | null>(null);
  const [saved, setSaved] = useState(false);

  const mappings = localMappings ?? data?.categories.reduce<Record<string, string>>((acc, c) => {
    if (c.mapped_to) acc[c.name] = c.mapped_to;
    return acc;
  }, {}) ?? {};

  const setMapping = useCallback((category: string, target: string) => {
    setLocalMappings((prev) => {
      const next = { ...(prev ?? data?.categories.reduce<Record<string, string>>((acc, c) => {
        if (c.mapped_to) acc[c.name] = c.mapped_to;
        return acc;
      }, {}) ?? {}) };
      if (target === '_ignore') {
        delete next[category];
      } else {
        next[category] = target;
      }
      return next;
    });
    setSaved(false);
  }, [data]);

  const isDirty = localMappings !== null;

  const handleSave = async () => {
    const toSave: Record<string, string> = {};
    for (const [cat, target] of Object.entries(mappings)) {
      toSave[cat] = target;
    }
    await saveMutation.mutateAsync(toSave);
    setLocalMappings(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const unknown = data?.categories.filter((c) => c.needs_mapping) ?? [];
  const known = data?.categories.filter((c) => c.is_known && !c.mapped_to) ?? [];
  const mapped = data?.categories.filter((c) => c.mapped_to && !c.is_known) ?? [];

  if (isLoading) {
    return (
      <div className="border border-white/10 bg-white/5 p-8">
        <p className="font-body text-white/40">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-500/20 bg-red-500/10 p-4">
        <p className="font-body text-sm text-red-400">Failed to load categories. Please try again.</p>
      </div>
    );
  }

  if (!data || data.total_count === 0) {
    return (
      <div className="border border-white/10 bg-white/5 p-8">
        <div className="flex items-start gap-4">
          <Tag className="h-5 w-5 shrink-0 text-white/20" />
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-1">No Categories Found</h3>
            <p className="font-body text-sm text-white/40">
              No transaction categories were found. Categories will appear here once you have transactions with non-standard categories.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="border border-white/10 bg-white/5 p-8">
        <h2 className="font-display text-xl font-bold text-white mb-4">Category Mappings</h2>
        <p className="font-body text-sm text-white/40 mb-6">
          Map unrecognized transaction categories to known financial metrics. Categories that match known patterns are handled automatically.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-white/10 bg-white/5 p-4">
            <p className="font-label-caps text-label-caps text-flow-gold">{known.length}</p>
            <p className="font-body text-xs text-white/40 mt-1">Auto-matched</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-4">
            <p className="font-label-caps text-label-caps text-flow-gold">{mapped.length}</p>
            <p className="font-body text-xs text-white/40 mt-1">Mapped by you</p>
          </div>
          <div className={`border p-4 ${unknown.length > 0 ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/10 bg-white/5'}`}>
            <p className="font-label-caps text-label-caps text-white">{unknown.length}</p>
            <p className="font-body text-xs text-white/40 mt-1">Needs mapping</p>
          </div>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 border border-green-500/30 bg-green-500/10 p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
          <p className="font-body text-sm text-green-400">Mappings saved successfully.</p>
        </div>
      )}

      {/* Unmapped categories */}
      {unknown.length > 0 && (
        <div className="border border-amber-500/20 bg-amber-500/[0.03] p-8">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="h-5 w-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">Unmapped Categories</h3>
            <span className="ml-auto font-label-caps text-label-caps text-amber-400">{unknown.length} need{unknown.length === 1 ? 's' : ''} attention</span>
          </div>
          <p className="font-body text-sm text-white/40 mb-6">
            These transaction categories weren&apos;t automatically recognized. Assign each to the correct financial metric.
          </p>
          <div className="space-y-3">
            {unknown.map((cat) => (
              <CategoryRow key={cat.name} category={cat} currentMapping={mappings[cat.name]} onChange={setMapping} />
            ))}
          </div>
        </div>
      )}

      {/* User-mapped categories */}
      {mapped.length > 0 && (
        <div className="border border-white/10 bg-white/5 p-8">
          <h3 className="font-display text-lg font-bold text-white mb-6">Your Mappings</h3>
          <div className="space-y-3">
            {mapped.map((cat) => (
              <CategoryRow key={cat.name} category={cat} currentMapping={mappings[cat.name]} onChange={setMapping} />
            ))}
          </div>
        </div>
      )}

      {/* Known categories */}
      {known.length > 0 && (
        <div className="border border-white/10 bg-white/5 p-8">
          <h3 className="font-display text-lg font-bold text-white mb-6">Auto-Matched Categories</h3>
          <p className="font-body text-sm text-white/40 mb-4">These categories are already handled by the system and don&apos;t need mapping.</p>
          <div className="flex flex-wrap gap-2">
            {known.map((cat) => (
              <span
                key={cat.name}
                className="inline-flex items-center gap-1.5 border border-green-500/20 bg-green-500/10 px-3 py-1.5 font-body text-xs text-green-400"
              >
                <CheckCircle2 className="h-3 w-3" />
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Save button */}
      {isDirty && (
        <div className="sticky bottom-0 border border-white/10 bg-flow-obsidian/95 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-white/40">You have unsaved changes</p>
            <button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="bg-flow-gold px-6 py-3 font-bold uppercase tracking-[0.15em] text-flow-black text-xs hover:brightness-110 transition-all disabled:opacity-50"
            >
              {saveMutation.isPending ? 'SAVING...' : 'SAVE MAPPINGS'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryRow({
  category,
  currentMapping,
  onChange,
}: {
  category: CategoryMappingItem;
  currentMapping?: string;
  onChange: (category: string, target: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = TARGET_OPTIONS.find((o) => o.value === currentMapping)?.label ?? 'Select a target...';

  return (
    <div className="border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-body text-sm font-medium text-white truncate">{category.name}</p>
          {currentMapping && (
            <p className="font-label-caps text-label-caps text-flow-gold mt-0.5">
              → {selectedLabel}
            </p>
          )}
        </div>
        <div className="relative shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 font-label-caps text-label-caps text-white/80 hover:border-white/40 hover:text-white transition-all min-w-[220px] text-left"
          >
            <span className="flex-1 truncate">{selectedLabel}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 w-full min-w-[240px] border border-white/10 bg-flow-black shadow-xl">
                {TARGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onChange(category.name, opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left font-body text-sm transition-all hover:bg-white/10 ${
                      currentMapping === opt.value ? 'text-flow-gold bg-white/5' : 'text-white/70'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
