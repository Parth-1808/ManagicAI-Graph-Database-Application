'use client';

import React, { useState, useEffect } from 'react';
import { TransitionLink } from '@/context/PageTransitionContext';
import { 
  Film, 
  ShieldCheck, 
  Briefcase, 
  GitFork, 
  Bot, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

interface TutorialStep {
  id: string;
  stepNumber: string;
  moduleTag: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  highlights: string[];
  actionLabel: string;
  actionHref?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    moduleTag: 'FILM PORTFOLIO & REVENUE',
    title: 'Managing Box Office Paydays & Equity Pools',
    subtitle: 'Track upfront advances, profit-sharing backend pools, and multi-currency box office collections across global tentpole productions.',
    icon: Film,
    accentColor: 'text-blue-400',
    bgGradient: 'from-blue-950 via-slate-950 to-indigo-950',
    borderColor: 'border-blue-500/40',
    highlights: [
      'Upfront Escrow Retainers (₹50 Cr+ Advance)',
      'Backend Profit-Sharing & Theatrical Pools',
      'Real-Time Worldwide Box Office Gross Telemetry'
    ],
    actionLabel: 'Explore Film Portfolio',
    actionHref: '/dashboard'
  },
  {
    id: 'step-2',
    stepNumber: '02',
    moduleTag: 'LEGAL SHIELD & EXCLUSIVITY',
    title: 'Sub-15ms AI Conflict & Category Radar',
    subtitle: 'Automated legal scanner that continuously isolates competing brand categories, schedule collisions, and unauthorized AI likeness clauses.',
    icon: ShieldCheck,
    accentColor: 'text-emerald-400',
    bgGradient: 'from-emerald-950 via-slate-950 to-teal-950',
    borderColor: 'border-emerald-500/40',
    highlights: [
      'Automatic Competitor Lock (Watches, Footwear)',
      'Perpetual AI Biometric Likeness Protection',
      'Instant Contract Collision Alerts'
    ],
    actionLabel: 'Check Exclusivity Radar',
    actionHref: '/insights'
  },
  {
    id: 'step-3',
    stepNumber: '03',
    moduleTag: 'FINANCIAL ESCROW VAULT',
    title: 'Guaranteed Milestone Escrow Settlements',
    subtitle: 'Client fees are held in secure 100% pre-funded cryptographic escrow vaults, releasing automatically post deliverable sign-off.',
    icon: Briefcase,
    accentColor: 'text-amber-400',
    bgGradient: 'from-amber-950 via-slate-950 to-yellow-950',
    borderColor: 'border-amber-500/40',
    highlights: [
      '100% Pre-Funded Advance Protection',
      'Auto-Release 24h Post Deliverable Sign-off',
      'Multi-Currency Settlement (INR, USD, GBP, EUR)'
    ],
    actionLabel: 'Inspect Escrow Vaults',
    actionHref: '/workspace'
  },
  {
    id: 'step-4',
    stepNumber: '04',
    moduleTag: '3D GRAPH TOPOLOGY',
    title: 'Obsidian-Style 3D Talent Ecosystem',
    subtitle: 'Orbit through a 4-level hierarchical graph mapping Root Talent, Category Hubs, Film & Brand Entities, and deep contract leaves.',
    icon: GitFork,
    accentColor: 'text-purple-400',
    bgGradient: 'from-purple-950 via-slate-950 to-indigo-950',
    borderColor: 'border-purple-500/40',
    highlights: [
      'Interactive 3D Sphere & Orbit Physics',
      '1-Hop Connected Contract Jump Links',
      'Hierarchical Breadcrumb Navigation'
    ],
    actionLabel: 'Launch 3D Knowledge Graph',
    actionHref: '/graph'
  },
  {
    id: 'step-5',
    stepNumber: '05',
    moduleTag: 'AGENTIC AI COPILOT',
    title: 'Agentic Talent Copilot & Insights',
    subtitle: 'Ask questions in natural language, draft deal addendums, calculate backend margins, or parse call-sheets with zero friction.',
    icon: Bot,
    accentColor: 'text-cyan-400',
    bgGradient: 'from-cyan-950 via-slate-950 to-blue-950',
    borderColor: 'border-cyan-500/40',
    highlights: [
      'Natural Language Talent Manager Chatbot',
      'AI Deal Acceptance / Rejection Rationale',
      'Automated Call-Sheet & Schedule Buffers'
    ],
    actionLabel: 'Open Insights & Analytics',
    actionHref: '/insights'
  }
];

export const DashboardPlatformTutorialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TUTORIAL_STEPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TUTORIAL_STEPS.length) % TUTORIAL_STEPS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TUTORIAL_STEPS.length);
  };

  return (
    <div 
      className="rounded-3xl bg-white/95 backdrop-blur-xl border border-white/80 p-5 sm:p-6 shadow-[0_10px_35px_rgba(99,102,241,0.06)] space-y-4 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-purple-100/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight leading-tight">
              How to Use This Platform — Tutorial
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Interactive 3D guide to talent workflows, escrows, and graph features.
            </p>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
            aria-label="Next step"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3D Perspective Card Stage */}
      <div className="relative w-full min-h-[300px] flex items-center justify-center [perspective:1000px] py-2">
        {TUTORIAL_STEPS.map((step, idx) => {
          const offset = idx - activeIndex;
          const isActive = offset === 0;
          const isPrev = offset === -1 || (activeIndex === 0 && idx === TUTORIAL_STEPS.length - 1);
          const isNext = offset === 1 || (activeIndex === TUTORIAL_STEPS.length - 1 && idx === 0);

          // Calculate 3D Transform
          let transformStyle = 'opacity-0 pointer-events-none scale-75 translate-x-0 z-0';
          if (isActive) {
            transformStyle = 'opacity-100 scale-100 translate-x-0 z-20 shadow-2xl rotate-y-0';
          } else if (isPrev) {
            transformStyle = 'opacity-40 scale-85 -translate-x-12 sm:-translate-x-20 z-10 [transform:rotateY(18deg)_translateZ(-80px)] cursor-pointer';
          } else if (isNext) {
            transformStyle = 'opacity-40 scale-85 translate-x-12 sm:translate-x-20 z-10 [transform:rotateY(-18deg)_translateZ(-80px)] cursor-pointer';
          }

          const IconComponent = step.icon;

          return (
            <div
              key={step.id}
              onClick={() => {
                if (!isActive) setActiveIndex(idx);
              }}
              className={`absolute w-full max-w-[420px] rounded-2xl bg-gradient-to-br ${step.bgGradient} border ${step.borderColor} p-5 text-white transition-all duration-500 ease-out select-none ${transformStyle}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-white/10 backdrop-blur-md ${step.accentColor}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    {step.moduleTag}
                  </span>
                </div>
                <span className="text-xs font-mono font-black text-white/80 bg-white/10 px-2 py-0.5 rounded-md">
                  {step.stepNumber} / 05
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-3 pt-3">
                <div>
                  <h3 className="text-base font-black text-white tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                    {step.subtitle}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1">
                  {step.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-200">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Action Button */}
                {isActive && step.actionHref && (
                  <div className="pt-2">
                    <TransitionLink
                      href={step.actionHref}
                      targetTitle={step.actionLabel}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>{step.actionLabel}</span>
                      <ArrowRight className="h-3 w-3" />
                    </TransitionLink>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Indicators & Step Switcher */}
      <div className="flex items-center justify-between pt-1 border-t border-purple-100/60 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          {TUTORIAL_STEPS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === dotIdx 
                  ? 'w-6 bg-purple-600' 
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Jump to tutorial step ${dotIdx + 1}`}
            />
          ))}
        </div>

        <span className="font-mono text-[11px] text-purple-700 font-bold">
          Step {activeIndex + 1} of {TUTORIAL_STEPS.length}
        </span>
      </div>

    </div>
  );
};
