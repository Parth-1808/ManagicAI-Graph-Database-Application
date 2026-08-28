'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { WorkspaceView } from '@/components/workspace/WorkspaceView';

export default function WorkspacePage() {
  return (
    <AppShell>
      <WorkspaceView />
    </AppShell>
  );
}
