'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Briefcase,
  Sparkles
} from 'lucide-react';
import { useWorkStore } from '@/store/useWorkStore';

export const AcceptedCollabsSection: React.FC = () => {
  const { acceptedCollabs, fetchIntelligenceInsights } = useWorkStore();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'ent-rolex': true });

  useEffect(() => {
    if (acceptedCollabs.length === 0) {
      fetchIntelligenceInsights();
    }
  }, [acceptedCollabs.length, fetchIntelligenceInsights]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100/70 text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Approved Brand Partnerships
            </h3>
            <p className="text-xs text-slate-500">
              Verified with 0 exclusivity collisions &amp; guaranteed escrow payouts (Live CognoDB)
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          {acceptedCollabs.length} Active Deals
        </span>
      </div>

      {/* Cards List */}
      {(!acceptedCollabs || acceptedCollabs.length === 0) ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-purple-100/80 bg-slate-50/60 p-4 h-28 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-purple-200/50 rounded-full" />
                <div className="h-4 w-16 bg-purple-200/50 rounded-full" />
              </div>
              <div className="h-3 w-3/4 bg-purple-100/60 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {acceptedCollabs.map((collab: any) => {
          const isExpanded = !!expanded[collab.id];

          return (
            <div
              key={collab.id}
              className="rounded-2xl border border-purple-100/80 bg-slate-50/60 p-4 transition-all duration-200 hover:border-purple-300 space-y-3"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-purple-700 font-black text-sm shadow-2xs shrink-0">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        {collab.brand}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {collab.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {collab.term} • Signed {collab.signedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Escrowed Fee</div>
                    <div className="text-sm sm:text-base font-black text-purple-900">{collab.amount}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(collab.id)}
                    className="p-1.5 rounded-xl bg-white border border-purple-100 hover:bg-purple-50 text-slate-500 transition-colors cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Deliverables summary */}
              <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-purple-50">
                <span className="font-bold text-slate-700">Deliverables: </span>
                <span>{collab.deliverables}</span>
              </div>

              {/* Expandable Why Accepted Section */}
              {isExpanded && (
                <div className="pt-2 border-t border-purple-100/60 space-y-2 animate-in fade-in-0 duration-150">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>AI Acceptance Verification Rationale</span>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    {(collab.whyAccepted || []).map((reason: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Sparkles className="h-3 w-3 text-purple-500 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
