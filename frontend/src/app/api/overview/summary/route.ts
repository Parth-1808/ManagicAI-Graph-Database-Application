import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { talentService } from '@/server/services/talent.service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = withErrorHandler(async () => {
  const summary = await talentService.getOverviewSummary();
  return NextResponse.json(summary);
});
