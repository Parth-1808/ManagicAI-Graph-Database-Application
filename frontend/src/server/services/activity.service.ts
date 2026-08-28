import { activityRepository } from '../repositories/activity.repository';

export class ActivityService {
  async getActivitiesFeed() {
    const records = await activityRepository.getAllActivities();
    const activities = records.map((r: any) => ({
      id: r.id,
      type: r.type || 'shoot',
      title: r.title,
      detail: r.detail,
      timeAgo: r.timeAgo || 'Just now',
      status: r.status || 'active',
      queryPrompt: r.queryPrompt || `Tell me about ${r.title}`,
    }));

    return {
      activities,
      isLiveDb: true,
      count: activities.length,
      timestamp: new Date().toISOString(),
    };
  }
}

export const activityService = new ActivityService();
