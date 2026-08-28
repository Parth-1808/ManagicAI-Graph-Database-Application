import React from 'react';
import { GitFork, Search, ShieldCheck, Database, RefreshCw } from 'lucide-react';

export interface GraphStatsHeaderProps {
  totalNodes: number;
  totalEdges: number;
  portfolioValuation: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLiveDb?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const GraphStatsHeader: React.FC<GraphStatsHeaderProps> = ({
  totalNodes,
  totalEdges,
  portfolioValuation,
  searchQuery,
  onSearchChange,
  isLiveDb = true,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-5 sm:p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Description */}
      <div className="space-y-1 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
            <GitFork className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
            <span>MULTI-DIMENSIONAL TALENT KNOWLEDGE GRAPH</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold">
            <Database className="h-3 w-3 text-emerald-600" />
            <span>{isLiveDb ? 'CognoDB Cloud (Bolt 5.4)' : 'Local Cache'}</span>
          </div>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-purple-100 border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-900 text-[11px] font-medium transition-all shadow-2xs cursor-pointer"
              title="Sync latest live entities from CognoDB Cloud"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-purple-600' : 'text-slate-500'}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Graph'}</span>
            </button>
          )}
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hrithik Roshan Semantic Asset &amp; IP Graph
        </h1>
        <p className="text-xs text-slate-500 font-normal">
          Interactive 3D representation linking film franchises, commercial equity, legal covenants, and creative partnerships.
        </p>
      </div>

      {/* Search & KPIs */}
      <div className="flex flex-wrap items-center gap-3 relative z-10">
        {/* Search */}
        <div className="relative min-w-[200px] sm:min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search nodes, films, covenants..."
            className="w-full pl-9 pr-4 py-2 bg-white/95 border border-purple-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400/40 shadow-2xs"
          />
        </div>

        {/* Valuation Badge */}
        <div className="px-3.5 py-2 rounded-2xl bg-white border border-purple-200 shadow-2xs text-left">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Valuation</div>
          <div className="text-xs sm:text-sm font-extrabold text-purple-900">{portfolioValuation}</div>
        </div>

        {/* Nodes Count */}
        <div className="px-3.5 py-2 rounded-2xl bg-white border border-purple-200 shadow-2xs text-left">
          <div className="text-[10px] uppercase font-bold text-slate-400">Network Density</div>
          <div className="text-xs sm:text-sm font-extrabold text-slate-800">{totalNodes} Nodes • {totalEdges} Edges</div>
        </div>

        {/* Conflict Status */}
        <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <div className="text-xs font-bold text-emerald-800">100% Conflict Free</div>
        </div>
      </div>
    </div>
  );
};

