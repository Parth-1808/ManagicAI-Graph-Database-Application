import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { workspaceService } from '@/server/services/workspace.service';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { disputeId } = await req.json().catch(() => ({}));
  const result = await workspaceService.resolveDispute(disputeId);
  return NextResponse.json(result);
});
