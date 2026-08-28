'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { InsightsView } from '@/components/insights/InsightsView';

export default function InsightsPage() {
  return (
    <AppShell>
      <InsightsView />
    </AppShell>
  );
}