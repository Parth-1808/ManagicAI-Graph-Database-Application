'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

export function LoadingThreeDotsJumping() {
  const dotVariants: Variants = {
    jump: {
      transform: 'translateY(-26px)',
      transition: {
        duration: 0.7,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate="jump"
        transition={{ staggerChildren: -0.18, staggerDirection: -1 }}
        className="flex items-center justify-center gap-2.5 h-12"
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-md shadow-purple-500/30 will-change-transform"
          variants={dotVariants}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/30 will-change-transform"
          variants={dotVariants}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 shadow-md shadow-blue-500/30 will-change-transform"
          variants={dotVariants}
        />
      </motion.div>

      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-ping" />
        <span className="text-xs font-mono font-bold text-slate-600 tracking-wider uppercase">
          Synthesizing Work Graph...
        </span>
      </div>
    </div>
  );
}

export function PageTransitionLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f2fd]/95 via-[#eddcf8]/95 to-[#e3d0f5]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center space-y-6">
              {/* Brand icon */}
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/25">
                ◈
              </div>

              {/* Jumping dots animation */}
              <LoadingThreeDotsJumping />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
}

export default LoadingThreeDotsJumping;
