'use client';

import React from 'react';
import { GitFork, ArrowRight } from 'lucide-react';
import { TransitionLink } from '@/context/PageTransitionContext';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6 sm:p-8 bg-transparent pointer-events-none flex items-center justify-between">
      {/* Brand Logo & Name */}
      <TransitionLink 
        href="/" 
        targetTitle="Landing Overview"
        className="flex items-center gap-3.5 group pointer-events-auto select-none"
      >
        <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform duration-300">
          <div className="h-full w-full bg-white/90 backdrop-blur-md rounded-[14px] flex items-center justify-center">
            <GitFork className="h-6 w-6 text-purple-600 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>

        <span className="font-black text-2xl sm:text-3xl tracking-tight text-[#0f172a] drop-shadow-2xs">
          Managic<span className="text-purple-600">AI</span>
        </span>
      </TransitionLink>

      {/* Top Right "Get Started" White Button */}
      <div className="pointer-events-auto flex items-center gap-3">
        <TransitionLink
          href="/dashboard"
          targetTitle="Home Dashboard"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-none bg-white hover:bg-slate-50 text-slate-900 border border-purple-200/90 hover:border-purple-400 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
        >
          <span>Get Started</span>
          <ArrowRight className="h-3.5 w-3.5 text-purple-600 group-hover:translate-x-1 transition-transform" />
        </TransitionLink>
      </div>
    </header>
  );
};

