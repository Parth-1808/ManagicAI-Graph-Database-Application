'use client';

import React from 'react';
import { DashboardWelcomeCard } from '@/components/dashboard/DashboardWelcomeCard';
import { DashboardCalendarCard } from '@/components/dashboard/DashboardCalendarCard';
import { DashboardFilmEarningsCard } from '@/components/dashboard/DashboardFilmEarningsCard';
import { DashboardPlatformTutorialCarousel } from '@/components/dashboard/DashboardPlatformTutorialCarousel';

export default function DashboardPage() {
  return (
    <div className="max-w-[1780px] mx-auto pb-16 space-y-6">
      {/* Main Grid: Welcome + Film Earnings (Left) and Calendar + 3D Tutorial (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
          <DashboardWelcomeCard
            userName="Rohan"
            hubStatus="LIVE"
          />

          <DashboardFilmEarningsCard />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-6">
          <DashboardCalendarCard />

          <DashboardPlatformTutorialCarousel />
        </div>
      </section>
    </div>
  );
}
