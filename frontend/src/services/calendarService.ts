import { fetchApi } from './apiClient';
import { CalendarEvent } from '@/types';

export const calendarService = {
  async getEvents(): Promise<{ events: CalendarEvent[]; eventsMap?: Record<number, CalendarEvent[]> }> {
    return fetchApi<{ events: CalendarEvent[]; eventsMap?: Record<number, CalendarEvent[]> }>('/api/calendar/events');
  },

  async createEvent(event: Partial<CalendarEvent>): Promise<{ success: boolean; event?: CalendarEvent }> {
    return fetchApi<{ success: boolean; event?: CalendarEvent }>('/api/calendar/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  },

  async deleteEvent(id: string): Promise<{ success: boolean; deletedId?: string }> {
    return fetchApi<{ success: boolean; deletedId?: string }>(`/api/calendar/events?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },
};

export const overviewService = {
  async getSummary(): Promise<any> {
    return fetchApi('/api/overview/summary');
  },
};
