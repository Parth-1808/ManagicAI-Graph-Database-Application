'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppNavbar } from './AppNavbar';
import { FillerLoadingAnimation } from '@/components/common/FillerLoadingAnimation';
import { usePageTransition } from '@/context/PageTransitionContext';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isTransitioning, progress, targetTitle } = usePageTransition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f2fd] via-[#eddcf8] to-[#e3d0f5] text-slate-900 font-sans antialiased flex flex-col selection:bg-purple-200 selection:text-purple-900 relative">
      {/* Top Floating Pill Navbar */}
      <AppNavbar />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-7 relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="transition-filler"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-center min-h-[400px]"
            >
              <FillerLoadingAnimation progress={progress} />
            </motion.div>
          ) : (
            <motion.div
              key="page-content"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

