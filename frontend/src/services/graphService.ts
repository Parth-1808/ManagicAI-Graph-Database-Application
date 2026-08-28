import { fetchApi } from './apiClient';
import { GraphNodeData, GraphEdgeData, GraphNode, GraphEdge } from '@/types';

export interface GraphCategoryOption {
  id: string;
  label: string;
  count: number;
}

export interface SubgraphResponse {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  nodes3d: GraphNode[];
  edges3d: GraphEdge[];
  categories: GraphCategoryOption[];
  totalNodes: number;
  totalEdges: number;
  portfolioValuation: string;
  source: string;
  isLiveDb: boolean;
}

export const graphService = {
  async getSubgraph(): Promise<SubgraphResponse> {
    return fetchApi<SubgraphResponse>('/api/graph/subgraph');
  },

  async computePath(fromId: string, toId: string): Promise<{ path: string[] }> {
    return fetchApi<{ path: string[] }>('/api/graph/path', {
      method: 'POST',
      body: JSON.stringify({ fromId, toId }),
    });
  },

  async computeImpact(rootId: string): Promise<{ impactedNodeIds: string[] }> {
    return fetchApi<{ impactedNodeIds: string[] }>('/api/graph/impact', {
      method: 'POST',
      body: JSON.stringify({ rootId }),
    });
  },
};

