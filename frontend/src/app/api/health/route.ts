import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { pingCognoDB } from '@/server/db/cognodb.client';

export const GET = withErrorHandler(async () => {
  const ping = await pingCognoDB();
  return NextResponse.json({
    status: ping.healthy ? 'healthy' : 'degraded',
    database: {
      provider: 'CognoDB Cloud',
      protocol: 'Bolt 5.4 (TLS)',
      healthy: ping.healthy,
      latencyMs: ping.latencyMs,
    },
    timestamp: new Date().toISOString(),
  });
});
