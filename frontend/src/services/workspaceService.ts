import { fetchApi } from './apiClient';
import { WorkspaceItem } from '@/types';

export const workspaceService = {
  async getItems(): Promise<{ items: WorkspaceItem[] }> {
    return fetchApi<{ items: WorkspaceItem[] }>('/api/workspace/items');
  },

  async createItem(payload: {
    title: string;
    type: string;
    description: string;
    priority: string;
    dateKey?: number;
    time?: string;
    connectedNodeId?: string;
  }): Promise<{ success: boolean; item?: WorkspaceItem }> {
    return fetchApi<{ success: boolean; item?: WorkspaceItem }>('/api/workspace/create', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async resolveDispute(disputeId?: string): Promise<{ success: boolean; message?: string }> {
    return fetchApi<{ success: boolean; message?: string }>('/api/disputes/resolve', {
      method: 'POST',
      body: JSON.stringify({ disputeId }),
    });
  },
};
