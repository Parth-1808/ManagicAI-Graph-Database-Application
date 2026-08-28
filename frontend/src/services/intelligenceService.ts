import { fetchApi } from './apiClient';
import { IntelligenceInsight, CentralityRanking, CommunicationTelemetry } from '@/types';

export interface IntelligenceInsightsResponse {
  insights: IntelligenceInsight[];
  centralityRankings: CentralityRanking[];
  communicationTelemetry: CommunicationTelemetry;
  acceptedCollabs?: any[];
  rejectedCollabs?: any[];
  eventHistory?: any[];
  monthlyEarnings?: any[];
  yearlyEarnings?: any[];
}

export const intelligenceService = {
  async getInsights(): Promise<IntelligenceInsightsResponse> {
    return fetchApi<IntelligenceInsightsResponse>('/api/intelligence/insights');
  },

  async simulateDelay(taskId: string, delayDays: number): Promise<any> {
    return fetchApi('/api/intelligence/simulate-delay', {
      method: 'POST',
      body: JSON.stringify({ taskId, delayDays }),
    });
  },
};
