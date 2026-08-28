import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/server/errors/error-handler';
import { activityService } from '@/server/services/activity.service';

export const GET = withErrorHandler(async () => {
  const activities = await activityService.getActivitiesFeed();
  return NextResponse.json(activities);
});
