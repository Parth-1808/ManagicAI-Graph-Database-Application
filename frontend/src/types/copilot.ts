export type CopilotCategory = 'Shoot' | 'Brand Collab' | 'VIP Gala' | 'Conflict' | 'Finance' | 'General';

export interface CopilotInsight {
  title?: string;
  category?: CopilotCategory;
  items?: string[];
  actionLabel?: string;
  actionType?: string;
  value?: string;
}

export interface CopilotChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  insights?: CopilotInsight;
}

export interface CopilotActivityItem {
  id: string;
  type: 'shoot' | 'deal' | 'gala' | 'conflict' | 'director';
  title: string;
  detail: string;
  timeAgo: string;
  status: 'active' | 'success' | 'alert';
  queryPrompt: string;
}
