import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { talentService } from '@/server/services/talent.service';

export const GET = withErrorHandler(async () => {
  const roster = await talentService.getRoster();
  return NextResponse.json(roster);
});
