import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { graphService } from '@/server/services/graph.service';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { fromId, toId } = await req.json().catch(() => ({}));
  const result = await graphService.computePath(fromId || 'evt-1', toId || 'ent-cannes');
  return NextResponse.json(result);
});
