import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  RefreshCw, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  FolderKanban, 
  Plane, 
  AlertTriangle, 
  CheckCircle2, 
  Check, 
  Zap,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Film,
  Eye
} from 'lucide-react';

export const LiveSimulationPreview: React.FC = () => {
  const [initiativeProgress, setInitiativeProgress] = useState<number>(78);
  const [riskMitigated, setRiskMitigated] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <div className="space-y-6">
      {/* ── BENTO ROW 1: Real-Life Actor Problems & Graph Intelligence Shields ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1: Real-Life Actor Problem - Exclusivity Breaches & Hidden AI Clauses with Interactive Dashboard/Insights Slider */}
        <div className="lg:col-span-7 rounded-none bg-white/95 backdrop-blur-xl border border-purple-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(168,85,247,0.04)] hover:border-purple-400 hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group text-slate-800">
          
          {/* Top Aurora Neon Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 opacity-90 group-hover:h-[3.5px] transition-all duration-300" />
          
          {/* Ambient Aurora Glow on Hover */}
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-indigo-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="space-y-3 relative z-10">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold font-mono tracking-wide shadow-2xs">
                <Terminal className="h-3.5 w-3.5 text-purple-600" />
                <span>REAL-LIFE ACTOR PROBLEM #1 · CONTRACT RISKS</span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold">
                <span className="h-2 w-2 rounded-none bg-emerald-500 animate-pulse" />
                <span>Automated Legal Shield</span>
              </div>
            </div>

            {/* Title & Narrative */}
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                The ₹5 Cr Endorsement Breach Nobody Sees Coming.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                An actor casually wears a gift watch to an event or drinks a competing energy brand on Instagram. Within 2 hours, a breach notice arrives. Managic&apos;s live graph eliminates accidental contract defaults before deals are signed.
              </p>
            </div>
          </div>

          {/* Interactive Dashboard & Insights Slider Widget */}
          <div className="bg-slate-50 border border-slate-200 rounded-none p-4 space-y-3 font-sans relative z-10 shadow-2xs">
            
            {/* Slider Tab Controls & Navigation */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveSlide(0)}
                  className={`px-2.5 py-1 rounded-none font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSlide === 0
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className="h-3 w-3" />
                  <span>01. Executive Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSlide(1)}
                  className={`px-2.5 py-1 rounded-none font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSlide === 1
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="h-3 w-3" />
                  <span>02. Intelligence &amp; Insights</span>
                </button>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
                  aria-label="Previous Slide"
                  className="p-1 rounded-none bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <span className="text-[10px] font-mono font-bold text-slate-400 px-1">
                  {activeSlide + 1}/2
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
                  aria-label="Next Slide"
                  className="p-1 rounded-none bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Slide 0: Executive Dashboard Preview with Real Movie & Talent Visuals */}
            {activeSlide === 0 && (
              <div className="space-y-3 animate-fadeIn">
                {/* Talent Profile Bar with Realistic Visual Header */}
                <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white p-3 rounded-none flex items-center justify-between border border-purple-800/60 shadow-md relative overflow-hidden">
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="relative w-10 h-10 rounded-none border border-purple-400 overflow-hidden bg-slate-800 shrink-0 shadow-sm">
                      <img 
                        src="/hrithik-welcome.png" 
                        alt="Hrithik Roshan" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">Hrithik Roshan</span>
                        <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold rounded-none border border-emerald-400/40">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-[10px] text-purple-200 font-mono">
                        ₹335+ Cr Active Portfolio · 6 Franchises
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-[10px] hidden sm:block relative z-10">
                    <div className="text-slate-400 text-[9px]">Escrow Vault</div>
                    <div className="text-emerald-400 font-bold">₹2.98 Cr/mo</div>
                  </div>
                </div>

                {/* Film Portfolio Cards with Real Movie Posters */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {/* Movie 1: War 2 */}
                  <div className="bg-white border border-purple-200 rounded-none p-2 shadow-2xs flex items-center gap-2 group/card hover:border-purple-400 transition-all">
                    <div className="w-9 h-12 rounded-none overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                      <img 
                        src="/movies/war 2.png" 
                        alt="War 2" 
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-[11px] truncate">War 2</div>
                      <div className="text-[9px] text-purple-700 font-mono font-bold">₹48 Cr Escrow</div>
                      <div className="text-[8px] text-emerald-600 font-medium">YRF Stage 4 Shoot</div>
                    </div>
                  </div>

                  {/* Movie 2: Fighter */}
                  <div className="bg-white border border-purple-200 rounded-none p-2 shadow-2xs flex items-center gap-2 group/card hover:border-purple-400 transition-all">
                    <div className="w-9 h-12 rounded-none overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                      <img 
                        src="/movies/fighter.png" 
                        alt="Fighter" 
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-[11px] truncate">Fighter</div>
                      <div className="text-[9px] text-purple-700 font-mono font-bold">₹35 Cr Rights</div>
                      <div className="text-[8px] text-indigo-600 font-medium">Global Box Office</div>
                    </div>
                  </div>

                  {/* Movie 3: Krrish 4 */}
                  <div className="bg-white border border-purple-200 rounded-none p-2 shadow-2xs hidden sm:flex items-center gap-2 group/card hover:border-purple-400 transition-all">
                    <div className="w-9 h-12 rounded-none overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                      <img 
                        src="/movies/krish 3.jpg" 
                        alt="Krrish 4" 
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-[11px] truncate">Krrish 4</div>
                      <div className="text-[9px] text-purple-700 font-mono font-bold">₹60 Cr Dev</div>
                      <div className="text-[8px] text-amber-600 font-medium">Pre-Production</div>
                    </div>
                  </div>
                </div>

                {/* Live Operations Telemetry Stream */}
                <div className="bg-white p-2.5 rounded-none border border-slate-200 space-y-1.5 text-[10px] font-mono">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5 text-purple-800 font-bold">
                      <span className="h-1.5 w-1.5 rounded-none bg-purple-600" />
                      ROLEX CANNES RED CARPET ESCROW
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-none border border-emerald-200">
                      ₹45,00,000 Locked
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-none bg-emerald-500" />
                      LLOYD&apos;S £15M STUNT INSURANCE BOND
                    </span>
                    <span className="text-slate-600 font-bold">
                      100% Cleared (48h Buffer)
                    </span>
                  </div>
                </div>

                {/* Action Link to Dashboard */}
                <Link
                  href="/dashboard"
                  className="p-2.5 rounded-none bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-all shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5 text-purple-200" />
                    <span>Launch Live Talent Operations Dashboard</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-purple-200" />
                </Link>
              </div>
            )}

            {/* Slide 1: Intelligence & Insights Preview with Visual Graph Map */}
            {activeSlide === 1 && (
              <div className="space-y-3 animate-fadeIn">
                {/* Cybernetic openCypher Visual Graph Canvas HUD */}
                <div className="bg-slate-950 text-white p-3 rounded-none border border-purple-900/60 space-y-2 relative overflow-hidden shadow-md">
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

                  <div className="flex items-center justify-between text-[10px] font-mono relative z-10">
                    <span className="font-bold text-purple-300 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-none bg-emerald-400 animate-ping" />
                      LIVE COGNODB CYPHER TRAVERSAL
                    </span>
                    <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-none border border-emerald-700 text-[9px]">
                      11.4ms · Subgraph Verified
                    </span>
                  </div>

                  {/* Visual Node Network Representation */}
                  <div className="py-2 px-1 relative z-10 flex items-center justify-between gap-1 text-[9px] font-mono">
                    <div className="px-2 py-1 bg-purple-900/90 border border-purple-400 text-purple-200 rounded-none text-center">
                      <div className="font-bold">(:Talent)</div>
                      <div className="text-[8px] text-purple-300">Hrithik R.</div>
                    </div>

                    <ArrowRight className="h-3 w-3 text-purple-400 shrink-0" />

                    <div className="px-2 py-1 bg-indigo-900/90 border border-indigo-400 text-indigo-200 rounded-none text-center">
                      <div className="font-bold">(:Film)</div>
                      <div className="text-[8px] text-indigo-300">War 2 (YRF)</div>
                    </div>

                    <ArrowRight className="h-3 w-3 text-purple-400 shrink-0" />

                    <div className="px-2 py-1 bg-emerald-900/90 border border-emerald-400 text-emerald-200 rounded-none text-center">
                      <div className="font-bold">(:Covenant)</div>
                      <div className="text-[8px] text-emerald-300">+48h Buffer</div>
                    </div>

                    <ArrowRight className="h-3 w-3 text-purple-400 shrink-0" />

                    <div className="px-2 py-1 bg-amber-900/90 border border-amber-400 text-amber-200 rounded-none text-center">
                      <div className="font-bold">(:Gala)</div>
                      <div className="text-[8px] text-amber-300">Cannes VIP</div>
                    </div>
                  </div>

                  {/* Quarantined Collision Node Callout */}
                  <div className="p-1.5 bg-rose-950/90 border border-rose-600 rounded-none flex items-center justify-between text-[9px] font-mono relative z-10">
                    <span className="text-rose-300 font-bold flex items-center gap-1">
                      ⚠️ (:Brand {`{name: 'Tag Heuer'}`}) CONFLICT DETECTED
                    </span>
                    <span className="text-rose-200 bg-rose-900 px-1.5 py-0.2 rounded-none font-bold">
                      QUARANTINED
                    </span>
                  </div>
                </div>

                {/* 3 Real Problem Defense Shields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px]">
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-none space-y-1">
                    <div className="text-[9px] font-black text-rose-800 uppercase flex items-center justify-between">
                      <span>Watch Clash</span>
                      <span className="bg-white px-1 border border-rose-200 text-rose-700">99.4%</span>
                    </div>
                    <div className="font-bold text-slate-900 text-[10px]">Tag Heuer Lock</div>
                    <div className="text-[8px] text-rose-700 bg-white p-1 rounded-none border border-rose-200">
                      ⚠️ Blocked · ₹1.5 Cr Shield
                    </div>
                  </div>

                  <div className="p-2 bg-amber-50 border border-amber-200 rounded-none space-y-1">
                    <div className="text-[9px] font-black text-amber-800 uppercase flex items-center justify-between">
                      <span>Stunt Buffer</span>
                      <span className="bg-white px-1 border border-amber-200 text-amber-700">48h Gate</span>
                    </div>
                    <div className="font-bold text-slate-900 text-[10px]">London vs. Cannes</div>
                    <div className="text-[8px] text-amber-800 bg-white p-1 rounded-none border border-amber-200">
                      ✈️ Enforced: £15M Bond
                    </div>
                  </div>

                  <div className="p-2 bg-purple-50 border border-purple-200 rounded-none space-y-1">
                    <div className="text-[9px] font-black text-purple-800 uppercase flex items-center justify-between">
                      <span>AI Defense</span>
                      <span className="bg-white px-1 border border-purple-200 text-purple-700">Isolated</span>
                    </div>
                    <div className="font-bold text-slate-900 text-[10px]">GenAI Voice Clone</div>
                    <div className="text-[8px] text-purple-800 bg-white p-1 rounded-none border border-purple-200">
                      🛡️ Biometric IP Retained
                    </div>
                  </div>
                </div>

                {/* Action Link to Insights */}
                <Link
                  href="/insights"
                  className="p-2.5 rounded-none bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-all shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5 text-purple-200" />
                    <span>Launch Live openCypher Intelligence Hub</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-purple-200" />
                </Link>
              </div>
            )}

          </div>

        </div>

        {/* Card 2: Real-Life Actor Problem - Scattered WhatsApps & Lost Lakhs */}
        <div className="lg:col-span-5 rounded-none bg-white/95 backdrop-blur-xl border border-rose-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(244,114,182,0.04)] hover:border-rose-400 hover:shadow-[0_20px_50px_rgba(244,114,182,0.12)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group text-slate-800">
          
          {/* Top Aurora Neon Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 opacity-90 group-hover:h-[3.5px] transition-all duration-300" />
          
          {/* Ambient Aurora Glow on Hover */}
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-rose-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold font-mono uppercase">
                <Flame className="h-3.5 w-3.5 text-rose-600 animate-pulse" />
                <span>REAL-LIFE PROBLEM #2 · CHAT CHAOS</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 border border-purple-200">
                Unified Cockpit
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                When Multi-Crore Deals Live in WhatsApp Chats.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                A director changes call times on WhatsApp at midnight, a brand agent emails a ₹45L pitch that gets buried, and a lawyer holds an unsigned PDF on Drive.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-none p-3.5 space-y-2.5 font-sans relative z-10">
            <div className="p-2.5 bg-emerald-50 border border-emerald-200/90 rounded-none flex items-start gap-2.5 shadow-2xs">
              <div className="w-7 h-7 rounded-none bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 font-mono">
                WA
              </div>
              <div className="flex-1 text-[11px] space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">WhatsApp · Ayan Mukerji (War 2 Director)</span>
                  <span className="text-[9px] text-slate-400 font-mono">11:45 PM</span>
                </div>
                <p className="text-slate-600 leading-tight">
                  &ldquo;Stage 4 combat call-sheet shifted to 2:30 PM with Jr. NTR. Are stunt harnesses ready?&rdquo;
                </p>
              </div>
            </div>

            <div className="p-2.5 bg-sky-50 border border-sky-200/90 rounded-none flex items-start gap-2.5 shadow-2xs">
              <div className="w-7 h-7 rounded-none bg-sky-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 font-mono">
                MAIL
              </div>
              <div className="flex-1 text-[11px] space-y-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Sponsor Offer · Rolex International</span>
                  <span className="text-[9px] text-emerald-600 font-mono font-bold">Escrow Verified</span>
                </div>
                <p className="text-slate-600 leading-tight">
                  &ldquo;₹45,00,000 Upfront Milestone Escrow funded for Cannes Red Carpet VIP Styling.&rdquo;
                </p>
              </div>
            </div>

            <div className="p-2 bg-purple-50 border border-purple-200/90 rounded-none flex items-center justify-between text-[10px] font-mono text-purple-900">
              <span className="flex items-center gap-1.5 font-semibold truncate">
                📄 Lloyds_£15M_Stunt_Insurance_Bond.pdf
              </span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-none border border-emerald-300 font-bold shrink-0">
                100% Cleared
              </span>
            </div>
          </div>

          <div className="p-3 rounded-none bg-purple-50 border border-purple-200 text-purple-950 font-mono text-[11px] font-semibold text-center flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>From Lost WhatsApp Messages to 100% Escrow Funded Operations.</span>
          </div>
        </div>

      </div>

      {/* ── BENTO ROW 2: Large-Scale Enterprise Control & Causal Graph Engine ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 3: Autonomous Talent Dispatch & Flight Logistics */}
        <div className="lg:col-span-6 rounded-none bg-white/95 backdrop-blur-xl border border-indigo-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(99,102,241,0.04)] hover:border-indigo-400 hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group text-slate-800">
          
          {/* Top Aurora Neon Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 opacity-90 group-hover:h-[3.5px] transition-all duration-300" />
          
          {/* Ambient Aurora Glow on Hover */}
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-gradient-to-tr from-purple-500/20 via-indigo-500/20 to-pink-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold font-mono uppercase">
              <FolderKanban className="h-3.5 w-3.5 text-indigo-600" />
              <span>MISSION-CRITICAL COCKPIT · LOGISTICS ENGINE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Autonomous Talent Dispatch &amp; Flight Logistics.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Eliminate multi-crore production delays. Managic synchronizes private jet charters (VT-HRO), high-risk wirework call-sheets, and international VIP red carpets in one deterministic cockpit.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-none p-4 space-y-3 font-sans relative z-10 shadow-2xs">
            <div className="bg-white p-3 rounded-none border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-b border-slate-100 pb-1.5">
                <span className="font-bold text-slate-700">PRIVATE JET MANIFEST · VT-HRO</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-none border border-emerald-200">
                  48h Stunt Buffer: Cleared
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-black text-slate-900 font-mono">BOM</div>
                  <div className="text-[10px] font-semibold text-slate-500">YRF Stage 4 Shoot</div>
                </div>

                <div className="flex-1 flex flex-col items-center mx-4">
                  <span className="text-[9px] font-mono text-indigo-600 font-bold">Direct VIP Charter</span>
                  <div className="w-full border-t-2 border-dashed border-indigo-300 relative my-1">
                    <Plane className="h-3.5 w-3.5 text-indigo-600 absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white px-0.5" />
                  </div>
                  <span className="text-[8px] font-mono text-slate-400">Hrithik Roshan Manifest</span>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 font-mono">NCE</div>
                  <div className="text-[10px] font-semibold text-slate-500">Cannes Gala</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 font-mono pt-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-sans font-medium">Itinerary Sync Status</span>
                <span className="text-purple-700 font-bold">{initiativeProgress}% Confirmed</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-none overflow-hidden p-[1px]">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-none transition-all duration-500"
                  style={{ width: `${initiativeProgress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2 bg-white rounded-none border border-slate-200/80 shadow-2xs">
                <div className="text-sm font-black text-slate-900">₹335Cr</div>
                <div className="text-[9px] text-slate-500 font-sans">Portfolio</div>
              </div>
              <div className="p-2 bg-white rounded-none border border-slate-200/80 shadow-2xs">
                <div className="text-sm font-black text-slate-900">6 Films</div>
                <div className="text-[9px] text-slate-500 font-sans">Franchises</div>
              </div>
              <div
                className={`p-2 rounded-none border shadow-2xs transition-colors ${
                  initiativeProgress === 78
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <div className="text-sm font-black">{initiativeProgress === 78 ? '1 Risk' : '0 Clash'}</div>
                <div className="text-[9px] font-sans">Exclusivity</div>
              </div>
              <div
                className={`p-2 rounded-none border shadow-2xs transition-colors ${
                  initiativeProgress === 78
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <div className="text-[9px] font-black mt-0.5">
                  {initiativeProgress === 78 ? '1 Ready' : 'Resolved'}
                </div>
                <div className="text-[9px] font-sans">Escrow Lock</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setInitiativeProgress(initiativeProgress === 78 ? 98 : 78)}
            className="w-full py-2.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white rounded-none text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${initiativeProgress !== 78 ? 'animate-spin' : ''}`} />
            <span>{initiativeProgress === 78 ? 'Simulate Autonomous Dispatch Resolution' : 'Reset Simulation'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Card 4: Real-Time Blast Radius & Breach Immunity Engine */}
        <div className="lg:col-span-6 rounded-none bg-white/95 backdrop-blur-xl border border-amber-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(245,158,11,0.04)] hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group text-slate-800">
          
          {/* Top Aurora Neon Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-purple-500 to-indigo-600 opacity-90 group-hover:h-[3.5px] transition-all duration-300" />
          
          {/* Ambient Aurora Glow on Hover */}
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-gradient-to-br from-amber-500/20 via-purple-500/15 to-indigo-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-gradient-to-tr from-purple-500/20 via-amber-500/20 to-indigo-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-mono uppercase">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
              <span>AI CAUSAL GRAPH REASONING · PREDICTIVE ENGINE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Real-Time Blast Radius &amp; Breach Immunity Engine.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              When a production schedule slips, openCypher traverses 64 interconnected entity nodes in microseconds—instantly isolating colliding luxury endorsements and indemnifying talent against ₹1.5 Cr liquidated damages.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-none p-4 space-y-3 font-mono text-[10px] relative z-10 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-none bg-rose-500 animate-ping" />
                <span className="font-bold text-rose-800 uppercase">COLLISION DETECTED · TAG HEUER CONFLICT</span>
              </div>
              <span className="text-[9px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-none border border-slate-200">
                Penalty Shield: ₹1.5 Cr
              </span>
            </div>

            <div className="bg-white p-3 rounded-none border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 font-sans">🎬 War 2 Climax Combat (YRF Stage 4)</div>
                  <div className="text-[9px] text-slate-400">Fri 14:30 - 22:00 (Chroma 2-Cam Rig)</div>
                </div>
                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 font-bold rounded-none border border-purple-200">
                  Confirmed
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 font-sans">🏆 Festival de Cannes Red Carpet (79th Edition)</div>
                  <div className="text-[9px] text-slate-400">Sun 16:00 (Palais des Festivals)</div>
                </div>
                <span
                  className={`px-2 py-0.5 font-bold rounded-none border transition-all ${
                    riskMitigated
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {riskMitigated ? 'Rest Buffer Cleared (+48h)' : '❌ Rest Overlap'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-none bg-amber-50/80 border border-amber-200 text-amber-900 font-sans text-[11px]">
              {riskMitigated ? (
                <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Stunt recovery cleared. Private flight VT-HRO departure ratified.
                </span>
              ) : (
                <span>💡 <strong>AI Graph Action:</strong> Enforce 48h Lloyd&apos;s recovery covenant; shifted departure window to preserve ₹45L Rolex exclusivity vault.</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRiskMitigated(!riskMitigated)}
            className={`w-full py-2.5 rounded-none text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98 ${
              riskMitigated
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                : 'bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white shadow-purple-600/20'
            }`}
          >
            {riskMitigated ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span>Legal &amp; Schedule Quarantine Active</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Execute Instant Legal Quarantine</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
