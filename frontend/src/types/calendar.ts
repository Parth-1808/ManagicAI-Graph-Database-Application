export type CalendarEventCategory = 'Shoot' | 'Brand Collab' | 'VIP Gala' | 'Meeting';
export type CalendarEventStatus = 'pending' | 'completed' | 'in_review' | 'locked';

export interface CalendarEvent {
  id: string;
  dateKey: number; // day number in month e.g. 1-31
  month: number; // 0-11
  year: number;
  title: string;
  brandOrClient?: string;
  time?: string;
  category: CalendarEventCategory;
  amount?: string;
  badgeLabel?: string;
  status?: CalendarEventStatus;
  location?: string;
  attendees?: string[];
  description?: string;
}

export interface DayCellData {
  dayNumber: number;
  isCurrentMonth: boolean;
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
}
