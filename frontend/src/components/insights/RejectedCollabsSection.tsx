'use client';

import React, { useState, useEffect } from 'react';
import { 
  XCircle, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle,
  Lock
} from 'lucide-react';
import { useWorkStore } from '@/store/useWorkStore';

export const RejectedCollabsSection: React.FC = () => {
  const { rejectedCollabs, fetchIntelligenceInsights } = useWorkStore();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'rej-1': true });

  useEffect(() => {
    if (rejectedCollabs.length === 0) {
      fetchIntelligenceInsights();
    }
  }, [rejectedCollabs.length, fetchIntelligenceInsights]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-100/70 text-rose-700">
            <XCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Isolated &amp; Rejected Deal Inquiries
            </h3>
            <p className="text-xs text-slate-500">
              Automated conflict mitigation shielding talent equity &amp; exclusivity covenants (Live CognoDB)
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
          {rejectedCollabs.length} Blocked Inquiries
        </span>
      </div>

      {/* Cards List */}
      {(!rejectedCollabs || rejectedCollabs.length === 0) ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-rose-100/80 bg-rose-50/30 p-4 h-28 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-rose-200/50 rounded-full" />
                <div className="h-4 w-16 bg-rose-200/50 rounded-full" />
              </div>
              <div className="h-3 w-3/4 bg-rose-100/60 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {rejectedCollabs.map((collab: any) => {
          const isExpanded = !!expanded[collab.id];

          return (
            <div
              key={collab.id}
              className="rounded-2xl border border-rose-100/80 bg-rose-50/30 p-4 transition-all duration-200 hover:border-rose-300 space-y-3"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 font-black text-sm shadow-2xs shrink-0">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        {collab.brand}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {collab.riskTag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {collab.category} • Proposed {collab.inquiryDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Rejected Offer</div>
                    <div className="text-sm sm:text-base font-black text-slate-700 line-through">
                      {collab.proposedAmount}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(collab.id)}
                    className="p-1.5 rounded-xl bg-white border border-rose-100 hover:bg-rose-50 text-slate-500 transition-colors cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Proposed Deliverables */}
              <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-rose-50">
                <span className="font-bold text-slate-700">Demanded Terms: </span>
                <span>{collab.proposedDeliverables}</span>
              </div>

              {/* Expandable Why Rejected Section */}
              {isExpanded && (
                <div className="pt-2 border-t border-rose-100 space-y-2 animate-in fade-in-0 duration-150">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>AI Conflict Radar Rejection Rationale</span>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    {(collab.whyRejected || []).map((reason: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <AlertTriangle className="h-3 w-3 text-rose-500 shrink-0 mt-0.5" />
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
