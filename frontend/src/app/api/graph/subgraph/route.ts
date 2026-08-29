import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { graphService } from '@/server/services/graph.service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = withErrorHandler(async () => {
  const subgraph = await graphService.getSubgraph();
  return NextResponse.json(subgraph);
});
