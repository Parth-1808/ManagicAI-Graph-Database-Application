import { fetchApi } from './apiClient';
import { CopilotChatMessage } from '@/types';

export interface AskWorkAIResponse {
  answer: string;
  insights?: CopilotChatMessage['insights'];
  status?: string;
}

export const chatService = {
  async askWorkAI(message: string): Promise<AskWorkAIResponse> {
    return fetchApi<AskWorkAIResponse>('/api/chat/ask-workai', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};
