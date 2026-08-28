'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  GitFork, 
  ArrowRight
} from 'lucide-react';
import { TransitionLink } from '@/context/PageTransitionContext';
import { useWorkStore } from '@/store/useWorkStore';

export const DashboardTalentSpotlight: React.FC = () => {
  const { overviewSummary, talentRoster, fetchOverviewSummary } = useWorkStore();
  const [selectedRosterId, setSelectedRosterId] = useState('root-hrithik');

  useEffect(() => {
    if (!overviewSummary) {
      fetchOverviewSummary();
    }
  }, [overviewSummary, fetchOverviewSummary]);

  const liveTalent = overviewSummary?.talent;
  const activeRoster = (talentRoster && talentRoster.length > 0)
    ? talentRoster
    : overviewSummary?.talentRoster || [];

  const talent = {
    id: 'hrithik',
    name: liveTalent?.name || 'Hrithik Roshan',
    tier: 'Tier 1 Global A-Lister',
    avatar: liveTalent?.avatar || '/founder.jpg',
    currentProject: liveTalent?.currentProject || 'War 2 (YRF Spy Universe)',
    portfolioValuation: liveTalent?.portfolioValuation || '₹335+ Cr Active Portfolio',
    upcomingMilestone: liveTalent?.upcomingMilestone || 'Chroma Stage 4 Climax Shoot (London & Mumbai)',
    stats: [
      { label: 'Exclusivity Clearance', value: `${liveTalent?.clearanceScore || 100}%`, trend: 'Zero Collisions' },
      { label: 'Active Pipeline', value: overviewSummary?.commercialPipeline || '₹1.25 Cr Pipeline', trend: 'Live Escrow Locked' },
      { label: 'Active Franchises', value: `${overviewSummary?.filmCount || 6} Films`, trend: '₹1,500+ Cr Gross' },
      { label: 'Brand Retainers', value: `${overviewSummary?.brandCount || 7} Deals`, trend: '12-Yr Partner Lock' },
    ],
  };

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 sm:p-7 shadow-[0_12px_40px_rgba(168,85,247,0.06)] relative overflow-hidden flex flex-col space-y-5">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Active Roster & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-50 pb-4 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-300 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" title="Live On Set" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {talent.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-extrabold">
                {talent.tier}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {talent.currentProject} • {talent.portfolioValuation}
            </p>
          </div>
        </div>

        {/* Roster Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-purple-50 rounded-2xl border border-purple-100">
          {activeRoster.slice(0, 4).map((member: any) => {
            const isSelected = selectedRosterId === member.id;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedRosterId(member.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-purple-900 shadow-2xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar || '/founder.jpg'}
                  alt={member.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="hidden sm:inline">{(member.name || '').split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Spotlight Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {talent.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-50/70 border border-purple-100/70 hover:bg-purple-50/50 hover:border-purple-200 transition-all flex flex-col justify-between"
          >
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {stat.label}
            </span>
            <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
              {stat.value}
            </div>
            <span className="text-[10px] font-bold text-emerald-600 mt-0.5">
              {stat.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Access Routing Links */}
      <div className="pt-2 border-t border-purple-50 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="font-bold">Next Milestone: </span>
          <span className="text-slate-800 truncate max-w-xs">{talent.upcomingMilestone}</span>
        </div>

        <div className="flex items-center gap-2">
          <TransitionLink
            href="/graph"
            targetTitle="Enterprise Graph Canvas"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all"
          >
            <GitFork className="h-3.5 w-3.5 text-purple-600" />
            <span>Semantic Graph</span>
          </TransitionLink>

          <TransitionLink
            href="/insights"
            targetTitle="Intelligence & Insights"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <span>Deal Rationale</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </TransitionLink>
        </div>

      </div>
    </div>
  );
};