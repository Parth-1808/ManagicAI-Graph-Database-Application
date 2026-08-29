'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitFork, Sparkles } from 'lucide-react';

export interface GraphLoadingPresetProps {
  progress: number;
  stageText?: string;
  totalNodes?: number;
  totalEdges?: number;
}

export const GraphLoadingPreset: React.FC<GraphLoadingPresetProps> = ({
  progress,
  stageText,
  totalNodes = 64,
  totalEdges = 114,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  // Dynamic telemetry status based on loading percentage
  const telemetryMessage =
    stageText ||
    (clampedProgress < 25
      ? 'Connecting to CognoDB Cloud Bolt 5.4 Cluster...'
      : clampedProgress < 55
      ? `Traversing ${totalNodes} openCypher nodes & ${totalEdges} relationships...`
      : clampedProgress < 85
      ? 'Projecting 3D spherical coordinates & force-field topology...'
      : 'Calibrating collision boundaries & quantum node shaders...');

  return (
    <motion.div
      key="graph-loading-preset"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050711]/95 backdrop-blur-md select-none overflow-hidden"
    >
      {/* Background Cybernetic Radar Scan Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%), linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          }}
        />
      </div>

      {/* Rotating Radar Sweep Laser */}
      <div className="absolute w-[460px] h-[460px] rounded-full border border-purple-500/20 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgba(168, 85, 247, 0.25) 0deg, transparent 60deg, transparent 360deg)',
          }}
        />
      </div>

      {/* Central 3D Orbital Matrix */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Outer Ring 1 - Purple Glow */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.03, 1] }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute w-full h-full rounded-full border-2 border-dashed border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
        >
          {/* Orbital Satellite Node */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] border border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        </motion.div>

        {/* Middle Ring 2 - Indigo Counter-Rotation */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          {/* Orbital Satellite Node 2 */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] border border-white" />
          {/* Orbital Satellite Node 3 */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] border border-white" />
        </motion.div>

        {/* Inner Ring 3 - Rapid High-Energy Pulse */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-pink-400/60 shadow-[0_0_15px_rgba(244,63,94,0.35)]"
        >
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6] border border-white" />
        </motion.div>

        {/* Central Core Talent Anchor */}
        <motion.div
          animate={{ scale: [0.92, 1.08, 0.92] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-0.5 shadow-[0_0_35px_rgba(168,85,247,0.7)] flex items-center justify-center"
        >
          <div className="w-full h-full rounded-full bg-[#090d1f] flex flex-col items-center justify-center text-white">
            <GitFork className="h-6 w-6 text-purple-400 animate-pulse" />
            <span className="text-[9px] font-mono font-black text-purple-200 mt-0.5">3D HUB</span>
          </div>
        </motion.div>
      </div>

      {/* Telemetry Status & Progress HUD */}
      <div className="relative z-10 mt-8 flex flex-col items-center max-w-md w-full px-6 space-y-4 text-center">
        {/* Title Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 shadow-lg">
          <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-xs font-mono font-black text-purple-200 tracking-wider uppercase">
            Rendering 3D Knowledge Graph
          </span>
          <span className="px-1.5 py-0.5 rounded bg-purple-600/60 text-[10px] font-mono font-bold text-white">
            {clampedProgress}%
          </span>
        </div>

        {/* Sleek High-Precision Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 p-0.5 overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              initial={{ width: '0%' }}
              animate={{ width: `${clampedProgress}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>CognoDB Graph Engine</span>
            <span className="text-purple-300 font-bold">{clampedProgress} / 100</span>
          </div>
        </div>

        {/* Live Stage Status Message */}
        <p className="text-xs text-slate-300 font-mono tracking-tight animate-pulse min-h-[1.25rem]">
          {telemetryMessage}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 w-full">
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Nodes</div>
            <div className="text-xs font-bold text-purple-300 font-mono">{totalNodes} Live</div>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Edges</div>
            <div className="text-xs font-bold text-indigo-300 font-mono">{totalEdges} Links</div>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Protocol</div>
            <div className="text-xs font-bold text-emerald-300 font-mono">Bolt 5.4</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
