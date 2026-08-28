import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { calendarRepository } from '@/server/repositories/calendar.repository';

export const GET = withErrorHandler(async () => {
  const events = await calendarRepository.getEvents();
  return NextResponse.json({
    events,
    count: events.length,
    isLiveDb: true,
    timestamp: new Date().toISOString(),
  });
});
