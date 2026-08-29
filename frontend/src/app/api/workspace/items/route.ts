import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { workspaceService } from '@/server/services/workspace.service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = withErrorHandler(async () => {
  const data = await workspaceService.getWorkspaceData();
  return NextResponse.json(data);
});
