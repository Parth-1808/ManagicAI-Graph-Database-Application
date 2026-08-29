'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/landing/Hero';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { FounderSection } from '@/components/landing/FounderSection';
import { FAQ } from '@/components/landing/FAQ';
import { GetStartedModal } from '@/components/landing/GetStartedModal';

export default function LandingPage() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf7fd] text-[#0f172a] relative overflow-hidden flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">

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


