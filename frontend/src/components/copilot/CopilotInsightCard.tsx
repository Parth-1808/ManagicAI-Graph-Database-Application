import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { CopilotInsight } from '@/types';

export interface CopilotInsightCardProps {
  insights: CopilotInsight;
  onActionClick?: (actionType?: string, actionLabel?: string) => void;
}

export const CopilotInsightCard: React.FC<CopilotInsightCardProps> = ({
  insights,
  onActionClick,
}) => {
  return (
    <div className="mt-3 p-3.5 rounded-2xl bg-white/95 border border-purple-200/90 shadow-2xs space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-purple-50 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          <span>{insights.title || 'Talent Intelligence Insight'}</span>
        </div>
        {insights.value && (
          <span className="text-[11px] font-extrabold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full border border-purple-200">
            {insights.value}
          </span>
        )}
      </div>

      {/* Items list */}
      {insights.items && insights.items.length > 0 && (
        <ul className="space-y-1.5 text-xs text-slate-700 font-normal">
          {insights.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5 leading-snug">
              <span className="text-purple-600 font-bold shrink-0 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Action button */}
      {insights.actionLabel && (
        <div className="pt-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>AI Shield Verified</span>
          </div>

          <button
            type="button"
            onClick={() => onActionClick?.(insights.actionType, insights.actionLabel)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all group"
          >
            <span>{insights.actionLabel}</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
