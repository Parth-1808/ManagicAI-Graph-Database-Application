import React from 'react';
import { Sparkles, DollarSign, ShieldCheck, Award } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { useWorkStore } from '@/store/useWorkStore';

export interface InsightsSummaryMetricsProps {
  timeframe: 'monthly' | 'yearly';
  totalRevenueDisplay: string;
  totalRevenueSub: string;
}

export const InsightsSummaryMetrics: React.FC<InsightsSummaryMetricsProps> = ({
  timeframe,
  totalRevenueDisplay,
  totalRevenueSub,
}) => {
  const { acceptedCollabs, rejectedCollabs, eventHistory } = useWorkStore();
  const brandDealsCount = acceptedCollabs.length > 0 ? `${acceptedCollabs.length} Contracts` : '5 Contracts';
  const eventCount = eventHistory.length > 0 ? `${eventHistory.length} Galas & Summits` : '6 Festivals';

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(168,85,247,0.06)] relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
            <span>FINANCIAL VALUATION &amp; DECISION INTELLIGENCE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Talent Insights &amp; Deal Rationale
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Deep analytics into Hrithik Roshan&apos;s revenue attribution, AI-backed acceptance/rejection rationale across brand deals, and event trajectory.
          </p>
        </div>

        {/* Highlight KPI Box */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <div className="px-5 py-3.5 rounded-2xl bg-white/95 border border-purple-200 shadow-2xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {totalRevenueSub}
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-900 mt-0.5">
              {totalRevenueDisplay}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-0.5">
              {timeframe === 'monthly' ? '+22.4% vs Prev Mo' : '+38.5% YoY Growth'}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Brand Deals"
          value={brandDealsCount}
          sublabel="100% Escrow Funded"
          icon={DollarSign}
          trend="+18% Alpha"
        />
        <StatCard
          label="Exclusivity Defense"
          value="0 Conflicts"
          sublabel="Sub-15ms AI Shield"
          icon={ShieldCheck}
          trend="100% Cleared"
        />
        <StatCard
          label="Theatrical Valuation"
          value="₹1,550+ Cr"
          sublabel="War 2 & Krrish 4"
          icon={Award}
          trend="Lifetime Canon"
        />
        <StatCard
          label="Global Press Reach"
          value="50.2M+"
          sublabel={eventCount}
          icon={Sparkles}
          trend="Vogue / Variety"
        />
      </div>
    </div>
  );
};
