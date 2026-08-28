import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { graphService } from '@/server/services/graph.service';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { rootId } = await req.json().catch(() => ({}));
  const result = await graphService.computeImpact(rootId || 'cov-stunt');
  return NextResponse.json(result);
});
