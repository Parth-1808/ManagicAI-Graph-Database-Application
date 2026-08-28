import { graphRepository } from '../repositories/graph.repository';

export class GraphService {
  async getSubgraph() {
    const raw = await graphRepository.getRawSubgraph();
    const rawNodes = raw.nodes || [];
    const rawEdges = raw.edges || [];

    const nodes3d = rawNodes.map((item: any, idx: number) => {
      const n = item.n || item;
      const labels = Array.isArray(n.labels) ? n.labels : [];
      let category = 'other';
      let level = 2;

      if (labels.includes('Hub') || n.id?.startsWith('hub-')) {
        category = 'hub';
        level = 1;
      } else if (labels.includes('Film')) {
        category = 'movies';
        level = 2;
      } else if (labels.includes('Brand')) {
        category = 'brands';
        level = 2;
      } else if (labels.includes('Event') || labels.includes('Festival')) {
        category = 'events';
        level = 2;
      } else if (labels.includes('Covenant') || labels.includes('Dispute')) {
        category = 'covenants';
        level = 3;
      } else if (labels.includes('Talent') || n.id === 'root-hrithik') {
        category = 'talent';
        level = 0;
      } else if (labels.includes('Person') || labels.includes('Collaborator')) {
        category = 'talent';
        level = 2;
      }

      // Assign visual radius and color
      const visualRadius = level === 0 ? 18 : level === 1 ? 13 : level === 2 ? 9 : 6.5;
      const color =
        category === 'talent'
          ? '#c084fc'
          : category === 'movies'
          ? '#60a5fa'
          : category === 'brands'
          ? '#34d399'
          : category === 'events'
          ? '#fb923c'
          : category === 'covenants'
          ? '#f43f5e'
          : category === 'hub'
          ? '#a855f7'
          : '#94a3b8';

      // Compute deterministic spherical 3D positioning
      const phi = Math.acos(-1 + (2 * idx) / Math.max(1, rawNodes.length));
      const theta = Math.sqrt(rawNodes.length * Math.PI) * phi;
      const sphereRadius = level === 0 ? 0 : level === 1 ? 260 : 420;

      const x = Number((sphereRadius * Math.cos(theta) * Math.sin(phi)).toFixed(1));
      const y = Number((sphereRadius * Math.sin(theta) * Math.sin(phi)).toFixed(1));
      const z = Number((sphereRadius * Math.cos(phi)).toFixed(1));

      return {
        id: n.id || `node-${idx}`,
        label: n.name || n.title || n.brand || n.id || 'Entity',
        roleOrType: n.role || n.category || labels[0] || 'Node',
        level,
        category,
        radius: visualRadius,
        color,
        x,
        y,
        z,
        valuation: n.valuation || n.portfolioValuation || n.payday || n.amount,
        status: n.status || 'active',
        summary: n.description || n.subtitle || `${n.name || n.title} graph entity in CognoDB Cloud`,
        outgoingCount: Array.isArray(item.outgoing) ? item.outgoing.length : 0,
      };
    });

    const categoryCounts: Record<string, number> = {};
    nodes3d.forEach((n) => {
      categoryCounts[n.category] = (categoryCounts[n.category] || 0) + 1;
    });

    const dynamicCategories = [
      { id: 'all', label: 'All Clusters', count: nodes3d.length },
      { id: 'movies', label: 'Feature Films', count: categoryCounts['movies'] || 0 },
      { id: 'brands', label: 'Commercial Brands', count: categoryCounts['brands'] || 0 },
      { id: 'events', label: 'VIP Festivals & Galas', count: categoryCounts['events'] || 0 },
      { id: 'covenants', label: 'AI Legal Shields', count: categoryCounts['covenants'] || 0 },
      { id: 'talent', label: 'Creative Network', count: categoryCounts['talent'] || 0 },
    ];

    const nodes2d = nodes3d.map((n) => ({
      id: n.id,
      label: n.label,
      type: n.category === 'movies' ? 'film' : n.category === 'brands' ? 'brand' : n.category === 'events' ? 'event' : n.category === 'covenants' ? 'covenant' : 'person',
      subtitle: n.roleOrType,
      status: 'normal',
      details: { description: n.summary, valuation: n.valuation },
      x: n.x,
      y: n.y,
    }));

    const edges2d = rawEdges.map((e: any) => ({
      id: e.id,
      from: e.source,
      to: e.target,
      relation: e.label || e.type,
      isCritical: e.isCritical,
    }));

    return {
      nodes: nodes2d,
      edges: edges2d,
      nodes3d,
      edges3d: rawEdges,
      categories: dynamicCategories,
      totalNodes: nodes3d.length,
      totalEdges: rawEdges.length,
      portfolioValuation: '₹335+ Cr Active Portfolio',
      source: 'cognodb_bolt_live',
      isLiveDb: true,
      timestamp: new Date().toISOString(),
    };
  }

  async computePath(fromId: string, toId: string) {
    const path = await graphRepository.findShortestPath(fromId, toId);
    return { path, isLiveDb: true };
  }

  async computeImpact(rootId: string) {
    const impactedNodeIds = await graphRepository.computeDownstreamImpact(rootId);
    return { impactedNodeIds, isLiveDb: true };
  }
}

export const graphService = new GraphService();
