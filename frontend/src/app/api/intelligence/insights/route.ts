import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { intelligenceService } from '@/server/services/intelligence.service';

export const GET = withErrorHandler(async () => {
  const insights = await intelligenceService.getInsights();
  return NextResponse.json(insights);
});
