'use client';

import React, { useState } from 'react';
import { useWorkStore } from '@/store/useWorkStore';

interface DashboardWelcomeCardProps {
  userName?: string;
  rank?: number;
  country?: string;
  tier?: string;
  hubStatus?: string;
}

export const DashboardWelcomeCard: React.FC<DashboardWelcomeCardProps> = ({
  userName = 'Rohan',
}) => {
  const [isWaving, setIsWaving] = useState(false);
  const { overviewSummary } = useWorkStore();

  const talentName = overviewSummary?.talent?.name || 'Hrithik Roshan';
  const talentRole = overviewSummary?.talent?.role || 'Superstar';
  const hubStatus = overviewSummary?.talent?.status || 'LIVE';
  const clearanceScore = overviewSummary?.talent?.clearanceScore ?? 100;

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-3xl bg-gradient-to-r from-[#b3c7fa]/95 via-[#c3d9fc]/90 to-[#bfe3fb]/95 backdrop-blur-md border border-white/70 shadow-[0_10px_32px_rgba(99,102,241,0.08)] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:shadow-[0_14px_40px_rgba(99,102,241,0.12)] min-h-[195px] flex items-center">
      
      {/* Decorative ambient subtle background glows */}
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Right Side: Hrithik Roshan Cutout Image Overlay (Crisp, Unblended, Contained strictly inside this card) */}
      <div className="absolute right-0 bottom-0 h-full w-auto max-w-[48%] sm:max-w-[44%] md:max-w-[40%] flex items-end justify-end pointer-events-none select-none z-0">
        <img
          src="/hrithik-welcome.png"
          alt={talentName}
          className="h-[88%] sm:h-[92%] md:h-[96%] w-auto max-w-none object-contain object-bottom translate-y-2 sm:translate-y-2.5 drop-shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
        />

        {/* Floating Name Capsule for Root Talent */}
        <div className="absolute bottom-3 right-4 z-10 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/90 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold text-purple-900 uppercase tracking-wider">{talentRole}</span>
          <span className="text-slate-400 font-bold">•</span>
          <span className="font-black text-slate-900 text-xs tracking-wide">{talentName}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
        
        {/* Left Section: Hub Badge, Greeting, and Rank Capsule */}
        <div className="space-y-4 max-w-xl">
          
          {/* Creator Hub Live Pill */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/70 backdrop-blur-md border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-[11px] font-extrabold tracking-wider text-purple-700 uppercase">
              <span>TALENT MANAGER HUB</span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5 text-cyan-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-none h-2 w-2 bg-cyan-500" />
                </span>
                {hubStatus}
              </span>
            </div>
          </div>

          {/* Heading with animated waving hand */}
          <div className="flex items-baseline flex-wrap gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome back,{' '}
              <span className="text-[#5551ff] bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <span
              onMouseEnter={() => setIsWaving(true)}
              onAnimationEnd={() => setIsWaving(false)}
              className={`text-2xl sm:text-3xl md:text-4xl cursor-pointer select-none inline-block transition-transform duration-300 ${
                isWaving ? 'animate-bounce' : 'hover:scale-125'
              }`}
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </div>

          {/* Talent Managing Capsule */}
          <div>
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-none bg-white/80 backdrop-blur-md border border-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-xs sm:text-sm text-slate-700">
              <span className="text-purple-600 text-sm sm:text-base flex items-center font-bold">
                🎬 Managing: Hrithik Roshan
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
