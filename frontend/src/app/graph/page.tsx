'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { GraphView } from '@/components/graph/GraphView';

export default function GraphPage() {
  return (
    <AppShell>
      <GraphView />
    </AppShell>
  );
}