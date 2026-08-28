'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface FillerLoadingAnimationProps {
  progress?: number; // 0 to 100
  targetLabel?: string;
  subtext?: string;
  showDetails?: boolean;
  className?: string;
}

export const FillerLoadingAnimation: React.FC<FillerLoadingAnimationProps> = ({
  progress = 0,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full flex flex-col items-center justify-center py-6 select-none ${className}`}>
      {/* Sleek, slim, borderless filler bar with compact size */}
      <div className="w-44 sm:w-56 md:w-64 h-1.5 rounded-full bg-purple-950/10 overflow-hidden relative">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 shadow-xs transition-all duration-75 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

