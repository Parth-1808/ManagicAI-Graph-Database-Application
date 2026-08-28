'use client';

import React from 'react';
import { ChevronDown, ArrowRight, GitFork } from 'lucide-react';
import { TransitionLink } from '@/context/PageTransitionContext';

export const Hero: React.FC = () => {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-36 sm:pt-48 md:pt-56 pb-28 sm:pb-36 overflow-hidden min-h-[92vh]">
      {/* Top-Left Brand Logo & Name */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20">
        <TransitionLink 
          href="/" 
          targetTitle="Landing Overview"
          className="flex items-center gap-3 group select-none"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-none bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform duration-300">
            <div className="h-full w-full bg-white/95 rounded-none flex items-center justify-center">
              <GitFork className="h-5 w-5 text-purple-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>

          <span className="font-black text-2xl sm:text-3xl tracking-tight text-slate-900 drop-shadow-2xs">
            Managic<span className="text-purple-600">AI</span>
          </span>
        </TransitionLink>
      </div>

      {/* Top-Right White Glassmorphic "Get Started" Button wired to Dashboard */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
        <TransitionLink
          href="/dashboard"
          targetTitle="Home Dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 border border-white/80 hover:border-purple-300 backdrop-blur-md text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_22px_rgba(147,51,234,0.2)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
        >
          <span>Get Started</span>
          <ArrowRight className="h-3.5 w-3.5 text-purple-600 group-hover:translate-x-1 transition-transform" />
        </TransitionLink>
      </div>


      {/* Background Video - Crisp and Unblurred */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Clean Gradient Bottom Fade (No Blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#faf7fd] pointer-events-none" />

      {/* Center Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Headline Stack */}
        <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-[-0.035em] text-slate-900 leading-[1.08] drop-shadow-2xs">
            All-in-One
          </h1>

          {/* Aurora Gradient Accent */}
          <div>
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-[-0.035em] leading-[1.08] bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent select-none inline-block pb-1">
              Copilot for Actor Managers.
            </span>
          </div>
        </div>

        {/* Sub-headline */}
        <p className="text-sm sm:text-base md:text-lg text-slate-800 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-10 font-semibold drop-shadow-2xs">
          Managic unifies your actor&apos;s entire ecosystem into one high-velocity workspace — <strong className="text-slate-950 font-bold">Brand Collabs, Film Shoots, VIP Invitations, Director Meetings, Call-Sheets, and Inbox</strong>. Isolate scheduling conflicts, track contract deliverables, and maximize endorsement value with 1-click ease.
        </p>

        {/* Action Button: Single 'See Features' with Smooth Scroll */}
        <div className="flex items-center justify-center animate-in fade-in duration-700">
          <button
            type="button"
            onClick={scrollToFeatures}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/80 hover:bg-white text-slate-900 border border-white/80 hover:border-purple-300 backdrop-blur-md text-xs sm:text-sm font-bold shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(147,51,234,0.2)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <span>Explore Manager Features</span>
            <ChevronDown className="h-4 w-4 text-purple-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
