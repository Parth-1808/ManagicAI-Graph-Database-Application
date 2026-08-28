import React from 'react';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const WorkspaceConflictsAlerts: React.FC = () => {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200/80 p-6 shadow-[0_12px_40px_rgba(16,185,129,0.06)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-emerald-600 text-white shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">
                AI Conflict Radar &amp; Exclusivity Shield
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                100% CLEAR
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Zero overlapping call-sheets or category exclusivity collisions detected across August 2026.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white/90 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
          <span>Sub-15ms AI Check Active</span>
        </div>
      </div>

      {/* Verified Shield Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/80 border border-emerald-100 space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Category Exclusivity Guard</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Rolex luxury watch covenant is active. Inquiries from Tag Heuer and Omega have been auto-isolated.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 border border-emerald-100 space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Shoot Call-Sheet Buffers</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            48h mandatory physical rest buffer between Warner Bros London shoot and Cannes VIP Gala departure.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 border border-emerald-100 space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Biometric AI Rights Lock</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Zero perpetual generative AI voice or likeness synthesis rights granted across all active contracts.
          </p>
        </div>
      </div>
    </div>
  );
};
