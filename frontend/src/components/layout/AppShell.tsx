'use client';

import React, { useEffect } from 'react';
import { AppNavbar } from './AppNavbar';
import { useWorkStore } from '@/store/useWorkStore';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const {
    fetchOverviewSummary,
    fetchWorkspaceItems,
    fetchIntelligenceInsights,
    fetchCalendarEvents,
    fetchActivities,
  } = useWorkStore();

  // Global background hydration from CognoDB Cloud
  useEffect(() => {
    fetchOverviewSummary();
    fetchWorkspaceItems();
    fetchIntelligenceInsights();
    fetchCalendarEvents();
    fetchActivities();
  }, [
    fetchOverviewSummary,
    fetchWorkspaceItems,
    fetchIntelligenceInsights,
    fetchCalendarEvents,
    fetchActivities,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f2fd] via-[#eddcf8] to-[#e3d0f5] text-slate-900 font-sans antialiased flex flex-col selection:bg-purple-200 selection:text-purple-900 relative">
      {/* Top Floating Pill Navbar */}
      <AppNavbar />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-7 relative min-h-[500px]">
        <div className="w-full h-full animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
};

