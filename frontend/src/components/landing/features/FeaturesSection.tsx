'use client';

import React from 'react';
import { Sparkles, Radio } from 'lucide-react';
import { LiveSimulationPreview } from './LiveSimulationPreview';
import { ArchitectureLayersVisualizer } from './ArchitectureLayersVisualizer';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative w-full pt-28 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 font-sans scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 border border-purple-300/80 shadow-sm text-xs font-bold tracking-wide text-purple-950 font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
            <span>AI-Powered Talent Management &amp; Career Operations</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Why{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Managic is Superior for Actor Managers.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Scattered DMs, WhatsApp shoot updates, lost brand sponsorship pitches, and double-booking risks cost actors millions. Managic models your talent&apos;s entire ecosystem into a live relational graph.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-mono font-bold text-purple-700 shadow-2xs">
            <Radio className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
            <span>Powered by CognoDB &amp; openCypher over Bolt protocol (Bolt 5.0–5.4)</span>
          </div>
        </div>

        {/* Live Simulation Preview: Bento Grid 1 & 2 */}
        <LiveSimulationPreview />

        {/* Architecture Layers Visualizer: 5-layer isometric glass slabs */}
        <ArchitectureLayersVisualizer />

      </div>
    </section>
  );
};
