'use client';

import React, { useState } from 'react';
import { TransitionLink } from '@/context/PageTransitionContext';
import { ChevronRight } from 'lucide-react';

export interface LayerData {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const WORKAI_GRAPH_LAYERS: LayerData[] = [
  {
    id: 'layer-05',
    num: '05',
    name: 'Talent Decision Copilot & Escrow Guardian',
    subtitle: 'Graph-Augmented AI Reasoning & Instant Milestone Release',
    description: 'Synthesizes openCypher graph traversals across Hrithik Roshan\'s active portfolio (₹335+ Cr) to verify deliverables, unblock call-sheets, and authorize ₹45L escrow milestones with 1-click confidence.',
    tags: ['1-Click Escrow Release', 'AI Copilot Reasoning', 'Rolex Milestone Lock', '100% Clearance Score'],
  },
  {
    id: 'layer-04',
    num: '04',
    name: 'AI Exclusivity & Conflict Reasoning Engine',
    subtitle: 'Sub-15ms Multi-Hop Cypher Collision & Precedence Traversal',
    description: 'Executes deep graph pattern queries over CognoDB to auto-quarantine competing deals (Tag Heuer luxury watch collision) and enforce 48h physical rest buffers between London stunt shoots and Cannes Red Carpet galas.',
    tags: ['AI Conflict Radar', 'Stunt Precedence Chain', 'Tag Heuer Collision Shield', 'Sub-15ms Cypher'],
  },
  {
    id: 'layer-03',
    num: '03',
    name: 'CognoDB Semantic Talent & Rights Graph',
    subtitle: 'Live Cloud Graph Database on Bolt 5.4 Protocol',
    description: 'Maintains 64 interconnected nodes and 114 relationships across 6 Film Franchises (War 2, Krrish 4), 7 Brands (Rolex, Rado, HRX), 6 VIP Galas, 4 Legal Shields, and 9 Creative Network Collaborators.',
    tags: ['CognoDB Cloud', '64 Nodes & 114 Edges', 'Biometric Likeness Shield', 'Bolt Protocol 5.4'],
  },
  {
    id: 'layer-02',
    num: '02',
    name: 'Unified Multi-Source Operations Ingestion',
    subtitle: 'Automated Call-Sheets, Escrows & Legal Covenant Parser',
    description: 'Continuously synchronizes shoot call-sheets from YRF Studios Stage 4, commercial sponsor terms, Lloyd\'s £15M stunt bonds, and Cannes VIP styling manifests into live graph entities.',
    tags: ['YRF Call-Sheet Parser', 'Lloyd\'s Stunt Bond Sync', 'VIP Gala Styling Manifests', 'Contract Escrows'],
  },
  {
    id: 'layer-01',
    num: '01',
    name: 'ManagicAI Executive Command Control Plane',
    subtitle: 'Unified 3D Semantic Canvas & High-Velocity Talent Hub',
    description: 'Empowers talent managers and producers with an interactive 3D force-directed graph canvas, live revenue stream attribution (₹2.98 Cr/mo), and real-time operations audit stream.',
    tags: ['3D Force-Directed Canvas', '₹335+ Cr Portfolio View', 'Live Operations Stream', 'Dynamic Roster Hub'],
  },
];

const RealisticIsometricGlassSlab: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
  return (
    <div
      className={`relative transition-all duration-300 transform-gpu ${
        isSelected ? '-translate-y-1.5 scale-[1.04]' : 'hover:-translate-y-0.5'
      }`}
    >
      {isSelected && (
        <div
          className="absolute -inset-2 rounded-full bg-purple-500/40 blur-md pointer-events-none transition-opacity duration-300 animate-pulse"
          style={{ transform: 'scaleY(0.45) translateY(4px)' }}
        />
      )}

      <svg width="200" height="28" viewBox="0 0 220 30" className="overflow-visible">
        <defs>
          <linearGradient id="activeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d0fe" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#e879f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="activeLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="activeRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="inactiveTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.92" />
          </linearGradient>

          <linearGradient id="inactiveLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="inactiveRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* 1. TOP FACE OF SLAB */}
        <polygon
          points="4,9 168,1 216,9 52,17"
          fill={isSelected ? 'url(#activeTopGrad)' : 'url(#inactiveTopGrad)'}
          stroke={isSelected ? '#9333ea' : '#94a3b8'}
          strokeWidth={isSelected ? '2' : '1.2'}
          strokeLinejoin="round"
        />

        {/* 2. LEFT FRONT BEVEL/CHAMFER */}
        <polygon
          points="4,9 52,17 52,24 4,16"
          fill={isSelected ? 'url(#activeLeftGrad)' : 'url(#inactiveLeftGrad)'}
          stroke={isSelected ? '#7e22ce' : '#64748b'}
          strokeWidth={isSelected ? '1.5' : '1'}
          strokeLinejoin="round"
        />

        {/* 3. RIGHT FRONT FACE */}
        <polygon
          points="52,17 216,9 216,16 52,24"
          fill={isSelected ? 'url(#activeRightGrad)' : 'url(#inactiveRightGrad)'}
          stroke={isSelected ? '#7e22ce' : '#64748b'}
          strokeWidth={isSelected ? '1.5' : '1'}
          strokeLinejoin="round"
        />

        {/* Specular Inner Glaze Highlight */}
        <line
          x1="12"
          y1="10"
          x2="160"
          y2="3"
          stroke="#ffffff"
          strokeOpacity={isSelected ? '0.9' : '0.6'}
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};

export const ArchitectureLayersVisualizer: React.FC = () => {
  const [hoveredLayerIndex, setHoveredLayerIndex] = useState<number | null>(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const currentActiveIndex = hoveredLayerIndex !== null ? hoveredLayerIndex : selectedLayerIndex;
  const activeLayer = WORKAI_GRAPH_LAYERS[currentActiveIndex];

  return (
    <div
      id="architecture"
      className="rounded-3xl bg-gradient-to-br from-white/95 via-purple-50/50 to-indigo-50/60 border border-purple-200/80 p-6 sm:p-8 shadow-[0_4px_30px_rgba(168,85,247,0.08)] relative overflow-hidden scroll-mt-16"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Stacked 3D Slabs */}
        <div
          onMouseLeave={() => setHoveredLayerIndex(null)}
          className="lg:col-span-6 flex flex-col justify-center items-start space-y-4 py-3 pl-1 sm:pl-2 select-none"
        >
          {WORKAI_GRAPH_LAYERS.map((layer, idx) => {
            const isHovered = hoveredLayerIndex === idx;

            return (
              <div
                key={layer.id}
                onMouseEnter={() => {
                  setHoveredLayerIndex(idx);
                  setSelectedLayerIndex(idx);
                }}
                onClick={() => setSelectedLayerIndex(idx)}
                className="group cursor-pointer flex items-center gap-3 sm:gap-4 transition-all duration-200 w-full"
              >
                {/* Isometric 3D Slab */}
                <div className="relative shrink-0">
                  <RealisticIsometricGlassSlab isSelected={isHovered} />
                </div>

                {/* Dotted Connector Line */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div
                    className={`h-[1px] w-8 sm:w-14 border-b border-dashed transition-all duration-200 ${
                      isHovered
                        ? 'border-purple-600 border-[1.5px] drop-shadow-[0_0_6px_rgba(147,51,234,0.6)]'
                        : 'border-slate-300 group-hover:border-purple-400'
                    }`}
                  />

                  {/* Number & Name */}
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`font-mono text-xs font-bold tracking-tight transition-colors duration-200 ${
                        isHovered
                          ? 'text-purple-600 font-black drop-shadow-[0_0_8px_rgba(147,51,234,0.4)]'
                          : 'text-slate-400 group-hover:text-purple-600'
                      }`}
                    >
                      {layer.num}
                    </span>

                    <span
                      className={`text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 truncate ${
                        isHovered
                          ? 'text-purple-950 font-black text-sm sm:text-base drop-shadow-2xs'
                          : 'text-slate-700 group-hover:text-slate-950'
                      }`}
                    >
                      {layer.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Layer Spec Inspector */}
        <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-white/90 via-purple-50/60 to-pink-50/50 border border-purple-200/90 p-6 space-y-4 transition-all duration-300 shadow-2xs">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-purple-900 bg-gradient-to-r from-purple-100 to-pink-100 px-2.5 py-1 rounded-lg border border-purple-200 shadow-2xs">
                LAYER {activeLayer.num}
              </span>
              <h4 className="text-base font-bold text-slate-900">{activeLayer.name}</h4>
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-700/60 uppercase tracking-wider">
              Hover to Inspect
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-purple-900 font-mono">
              {activeLayer.subtitle}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeLayer.description}
            </p>
          </div>

          <div className="pt-2 border-t border-purple-100">
            <div className="text-[10px] font-mono font-bold text-purple-900/60 uppercase tracking-wider mb-2">
              Core Capabilities
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeLayer.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-lg bg-white/90 border border-purple-200/80 text-purple-950 text-[11px] font-mono font-semibold shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <TransitionLink
              href="/dashboard"
              targetTitle="Home Dashboard"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
            >
              <span>Explore in Live Work Graph</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </TransitionLink>
          </div>

        </div>
      </div>
    </div>
  );
};
