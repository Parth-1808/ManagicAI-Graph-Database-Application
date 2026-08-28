import React from 'react';
import { Layers, FolderTree } from 'lucide-react';
import { NodeLevel } from '@/types';

export interface GraphCategoryOption {
  id: string;
  label: string;
  count: number;
}

export const GRAPH_LEVELS: { level: 'all' | NodeLevel; label: string; desc: string }[] = [
  { level: 'all', label: 'All Depths', desc: 'Full deep recursive graph' },
  { level: 1, label: 'L1: Hubs', desc: 'Primary core domains' },
  { level: 2, label: 'L2: Entities', desc: 'Films, Deals, Galas, Shields' },
  { level: 3, label: 'L3: Attributes', desc: 'Clauses, Escrows, Equity' },
];

export interface GraphSidebarFiltersProps {
  levelFilter: 'all' | NodeLevel;
  onLevelFilterChange: (level: 'all' | NodeLevel) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  categories?: GraphCategoryOption[];
}

export const GraphSidebarFilters: React.FC<GraphSidebarFiltersProps> = ({
  levelFilter,
  onLevelFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories = [],
}) => {
  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 p-4 space-y-4 shadow-2xs">
      {/* Level Depth Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5 text-purple-600" />
          <span>Hierarchy Depth</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {GRAPH_LEVELS.map((lvl) => {
            const isActive = levelFilter === lvl.level;
            return (
              <button
                key={String(lvl.level)}
                type="button"
                onClick={() => onLevelFilterChange(lvl.level)}
                className={`text-left p-2 rounded-xl border text-xs transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-600 shadow-2xs font-bold'
                    : 'bg-white text-slate-700 border-purple-100 hover:border-purple-300 font-medium'
                }`}
              >
                <div className="text-[11px] truncate">{lvl.label}</div>
                <div className={`text-[9px] truncate ${isActive ? 'text-purple-100' : 'text-slate-400'}`}>
                  {lvl.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-2 pt-2 border-t border-purple-50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <FolderTree className="h-3.5 w-3.5 text-purple-600" />
          <span>Category Slices</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryFilterChange(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  isActive
                    ? 'bg-purple-900 text-white border-purple-900 shadow-2xs'
                    : 'bg-white text-slate-600 border-purple-100 hover:border-purple-200 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 text-[10px] ${isActive ? 'text-purple-200' : 'text-slate-400'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
