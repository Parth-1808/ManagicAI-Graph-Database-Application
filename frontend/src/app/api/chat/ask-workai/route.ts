import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { copilotService } from '@/server/services/copilot.service';

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { message, prompt } = await req.json().catch(() => ({}));
  const query = message || prompt || 'overview';
  const response = await copilotService.processQuery(query);
  return NextResponse.json(response);
});
