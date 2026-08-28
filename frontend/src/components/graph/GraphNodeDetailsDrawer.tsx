import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Film, 
  Calendar 
} from 'lucide-react';
import { GraphNode } from '@/types';

export interface GraphNodeDetailsDrawerProps {
  node?: GraphNode | null;
  onSelectNodeById: (nodeId: string) => void;
  connectedNodeIds?: string[];
  nodeMap: Map<string, GraphNode>;
}

export const GraphNodeDetailsDrawer: React.FC<GraphNodeDetailsDrawerProps> = ({
  node,
  onSelectNodeById,
  connectedNodeIds = [],
  nodeMap,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'movies':
        return <Film className="h-4 w-4 text-blue-400" />;
      case 'brands':
        return <Briefcase className="h-4 w-4 text-emerald-400" />;
      case 'events':
        return <Calendar className="h-4 w-4 text-amber-400" />;
      case 'covenants':
        return <ShieldCheck className="h-4 w-4 text-rose-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-purple-400" />;
    }
  };

  if (!node) {
    return (
      <div className="rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 p-5 text-white flex flex-col space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <Sparkles className="h-4 w-4 animate-spin" />
          <span>Syncing CognoDB Graph...</span>
        </div>
        <p className="text-xs text-slate-400">Loading dynamic graph nodes from CognoDB Cloud over Bolt Protocol.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 p-5 text-white flex flex-col space-y-4 shadow-2xl">
      {/* Node Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md mt-0.5"
            style={{ backgroundColor: `${node.color}25`, border: `1px solid ${node.color}60` }}
          >
            {getCategoryIcon(node.category)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                {node.label}
              </h3>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                style={{ backgroundColor: `${node.color}30`, color: node.color }}
              >
                Level {node.level}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{node.roleOrType}</p>
          </div>
        </div>

        {node.valuation && (
          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Valuation / IP</div>
            <div className="text-xs sm:text-sm font-extrabold text-purple-300">{node.valuation}</div>
          </div>
        )}
      </div>

      {/* Status & Summary */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Status:</span>
          <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/80">
            {node.status}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
          {node.summary}
        </p>
      </div>

      {/* Bullet Points */}
      {node.details && node.details.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Covenant &amp; Asset Details
          </div>
          <div className="space-y-1">
            {node.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connected Entities Links */}
      {connectedNodeIds.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Connected Graph Entities ({connectedNodeIds.length})
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
            {connectedNodeIds.map((targetId) => {
              const targetNode = nodeMap.get(targetId);
              if (!targetNode) return null;
              return (
                <button
                  key={targetId}
                  type="button"
                  onClick={() => onSelectNodeById(targetId)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-purple-950/80 border border-slate-700 hover:border-purple-500 text-xs text-slate-200 transition-all group"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: targetNode.color }}
                  />
                  <span className="truncate max-w-[130px] font-medium">{targetNode.label}</span>
                  <ChevronRight className="h-3 w-3 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
