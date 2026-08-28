'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/landing/Hero';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { FounderSection } from '@/components/landing/FounderSection';
import { FAQ } from '@/components/landing/FAQ';
import { GetStartedModal } from '@/components/landing/GetStartedModal';
import { FillerLoadingAnimation } from '@/components/common/FillerLoadingAnimation';
import { usePageTransition } from '@/context/PageTransitionContext';

export default function LandingPage() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const { isTransitioning, progress, targetTitle } = usePageTransition();

  return (
    <div className="min-h-screen bg-[#faf7fd] text-[#0f172a] relative overflow-hidden flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <motion.div
            key="landing-transition-filler"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#faf7fd] flex items-center justify-center p-6"
          >
            <FillerLoadingAnimation
              progress={progress}
              targetLabel={targetTitle || 'Home Dashboard'}
              subtext="Initializing CognoDB Enterprise Hub..."
              className="max-w-4xl"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Landing Sections */}
      <main className="flex-1 w-full pt-0 pb-12">
        <Hero />
        <FeaturesSection />
        <FounderSection />
        <FAQ />
      </main>

      {/* Get Started Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}


