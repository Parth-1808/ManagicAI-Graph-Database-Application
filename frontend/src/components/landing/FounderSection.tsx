'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Quote, 
  Github, 
  Linkedin, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  CheckCircle2,
  GitFork,
  Database,
  Mail,
  MapPin
} from 'lucide-react';

export const FounderSection: React.FC = () => {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  return (
    <section id="founder" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 font-sans scroll-mt-16">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-gradient-to-r from-purple-100/90 via-pink-100/80 to-indigo-100/90 border border-purple-200 shadow-2xs text-xs font-bold tracking-wide text-purple-900 font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>The Vision Behind Managic</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Built for Talent Velocity,{' '}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              From First Principles.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Why we engineered an all-in-one AI operating system for actor and celebrity managers powered by CognoDB.
          </p>
        </div>

        {/* Main 2-Column Grid: Remade Developer Card & Architectural Thesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ── LEFT COLUMN: REMADE MODERN DEVELOPER CARD ── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-none bg-gradient-to-br from-white/95 via-purple-50/50 to-indigo-50/60 border border-purple-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-5 h-full">
              
              {/* Photo Frame Container with Soft Ambient Glow */}
              <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden bg-slate-100 border border-purple-200/80 shadow-inner group">
                <Image
                  src="/founder.jpg"
                  alt="Parth Bachhav - Creator of Managic"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
                  priority
                />

                {/* Subtle Gradient Shadow Overlay on Bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Status Badge Overlaid on Photo */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-slate-900/90 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 animate-pulse" />
                    <span>FOUNDER &amp; DEVELOPER</span>
                  </span>
                </div>

                {/* Name & Title Overlaid at the bottom of the photo */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-black tracking-tight drop-shadow-sm">Parth Bachhav</h3>
                    <ShieldCheck className="h-4 w-4 text-purple-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-200 font-medium">Creator &amp; Lead Architect • Managic</p>
                </div>
              </div>

              {/* Bio Details & Location */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-purple-100 pb-2.5">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-purple-600" />
                    <span>Mumbai / Pune, India</span>
                  </span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200">
                    Building in Public
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Engineering the high-velocity command center for actor &amp; talent managers to effortlessly run brand deals, film schedules, VIP events, and high-stakes negotiations.
                </p>

                {/* Social & Connect Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-none bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-purple-200 transition-colors flex items-center justify-center gap-1.5 font-bold shadow-2xs"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/Parth-1808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-none bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-purple-200 transition-colors flex items-center justify-center gap-1.5 font-bold shadow-2xs"
                    title="Follow on GitHub"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="mailto:bachhavparth32@gmail.com"
                    className="p-2 rounded-none bg-slate-900 hover:bg-purple-700 text-white transition-colors flex items-center justify-center gap-1.5 font-bold shadow-2xs"
                    title="Send Email (bachhavparth32@gmail.com)"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Contact</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN: ARCHITECTURAL THESIS & 3 CORE PILLARS ── */}
          <div className="lg:col-span-7 rounded-none bg-gradient-to-br from-white/95 via-purple-50/50 to-indigo-50/60 border border-purple-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div className="inline-flex items-center gap-2 text-purple-700 font-bold text-xs font-mono uppercase">
                  <Quote className="h-4 w-4 fill-purple-600/15 text-purple-600" />
                  <span>Creator&apos;s Mission &amp; Thesis</span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-none font-mono">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Verified Architecture</span>
                </div>
              </div>

              {/* High-Impact Pull Quote */}
              <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                &ldquo;Managing an actor isn&apos;t a mess of WhatsApp chats and spreadsheets — it&apos;s a <span className="text-purple-600">Dynamic Career Graph</span> of high-stakes brand deals, shoot dates, VIP invites, and legal contracts.&rdquo;
              </blockquote>

              {/* Story Narrative */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  Talent managers handle millions of dollars in career value every year across fragmented channels. When an actor misses a major commercial shoot or violates a brand exclusivity clause, the breakdown happens because crucial dates and deliverables were scattered across WhatsApp, unread emails, and lost PDFs.
                </p>
                <p>
                  Generic project tools don&apos;t understand call-sheets, usage rights, red-carpet logistics, or endorsement conflicts. Managers need an intelligent system that automatically connects incoming sponsor offers to the actor&apos;s exact film shooting schedule.
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Managic</strong> was engineered from the ground up to solve this: storing your actor&apos;s full relational portfolio in <strong className="text-purple-700 font-bold bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-none font-mono">CognoDB</strong>, detecting double-booking and exclusivity conflicts in milliseconds, and empowering managers with 1-click approvals and contract mitigations.
                </p>
              </div>

              {/* 3 Core Production Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                
                {/* Pillar 1: Multi-Calendar Traversal */}
                <div 
                  onMouseEnter={() => setHoveredPillar(0)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className={`p-3.5 rounded-none border transition-all duration-150 ${
                    hoveredPillar === 0 
                      ? 'bg-purple-100/90 border-purple-300 shadow-2xs' 
                      : 'bg-white/90 border-purple-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 w-6 rounded-none bg-purple-600 text-white flex items-center justify-center">
                      <GitFork className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-none">
                      &lt;15ms Cypher
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mb-1">Conflict Traversal</div>
                  <div className="text-[11px] text-slate-500 leading-snug font-normal">
                    Sub-millisecond pattern matching across film shoots, flights, and brand lockouts.
                  </div>
                </div>

                {/* Pillar 2: 1-Click Mitigation */}
                <div 
                  onMouseEnter={() => setHoveredPillar(1)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className={`p-3.5 rounded-none border transition-all duration-150 ${
                    hoveredPillar === 1 
                      ? 'bg-emerald-100/90 border-emerald-300 shadow-2xs' 
                      : 'bg-white/90 border-purple-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 w-6 rounded-none bg-emerald-600 text-white flex items-center justify-center">
                      <Zap className="h-3 w-3 fill-white text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-none">
                      1-Click
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mb-1">1-Click Approvals</div>
                  <div className="text-[11px] text-slate-500 leading-snug font-normal">
                    Instant contract addendum drafting, rate benchmarking, and RSVP dispatch.
                  </div>
                </div>

                {/* Pillar 3: CognoDB Graph Memory */}
                <div 
                  onMouseEnter={() => setHoveredPillar(2)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className={`p-3.5 rounded-none border transition-all duration-150 ${
                    hoveredPillar === 2 
                      ? 'bg-indigo-100/90 border-indigo-300 shadow-2xs' 
                      : 'bg-white/90 border-purple-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 w-6 rounded-none bg-indigo-600 text-white flex items-center justify-center">
                      <Database className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded-none">
                      Live Sync
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mb-1">Actor Career Graph</div>
                  <div className="text-[11px] text-slate-500 leading-snug font-normal">
                    Continuous real-time relational state across brands, directors, and agencies.
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Developer Connect Bar */}
            <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-none bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                  PB
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Parth Bachhav</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Creator &amp; Lead Architect • Managic
                  </div>
                </div>
              </div>

              <a
                href="https://parthportfolio-xi.vercel.app/#about"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-none bg-slate-900 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors group cursor-pointer"
              >
                <span>See Portfolio</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
