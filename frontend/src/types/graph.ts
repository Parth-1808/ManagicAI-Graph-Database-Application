export type EntityType =
  | 'person'
  | 'email'
  | 'meeting'
  | 'task'
  | 'project'
  | 'dispute'
  | 'event'
  | 'milestone'
  | 'adr';

export interface GraphNodeData {
  id: string;
  label: string;
  type: EntityType;
  subtitle: string;
  status?: 'normal' | 'blocked' | 'at_risk' | 'completed' | 'in_progress' | 'in-progress' | 'scheduled' | 'healthy' | 'open' | 'resolved' | 'overdue';
  details: {
    description: string;
    owner?: string;
    project?: string;
    priority?: 'critical' | 'high' | 'medium' | 'low';
    metrics?: { label: string; value: string | number }[];
    [key: string]: any;
  };
  x: number;
  y: number;
}

export interface GraphEdgeData {
  id: string;
  from: string;
  to: string;
  relation: string;
  isCritical?: boolean;
  label?: string;
}

export type GraphMode = 'explore' | 'find_path' | 'impact';

export interface GraphPathResult {
  pathNodeIds: string[];
  hopCount: number;
  isCritical: boolean;
}

export interface GraphImpactResult {
  rootId: string;
  impactedNodeIds: string[];
  totalDelayedDays: number;
  affectedMilestoneIds: string[];
}

// ── 3D Knowledge Graph Types ──
export type NodeLevel = 0 | 1 | 2 | 3;
// 0: Root Talent Anchor
// 1: Primary Category Hubs
// 2: Entities (Films, Brands, Events, Covenants, Creators)
// 3: Sub-Nodes / Deep Attribute & Clause Leaves

export type GraphCategory = 'talent' | 'movies' | 'brands' | 'events' | 'covenants' | 'collaborators';

export interface GraphNode {
  id: string;
  label: string;
  level: NodeLevel;
  parentId?: string;
  category: GraphCategory;
  roleOrType: string;
  valuation?: string;
  status: string;
  summary: string;
  details: string[];
  color: string;
  radius: number;
  // 3D coordinates & velocity
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export type EdgeType =
  | 'HIERARCHY'
  | 'DIRECTED_BY'
  | 'CO_STARS_WITH'
  | 'LEGAL_GOVERNANCE'
  | 'EQUITY_STAKE'
  | 'ESCROW_ESCORT'
  | 'EVENT_APPEARANCE'
  | 'SUB_ATTRIBUTE';

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label: string;
  isHierarchy?: boolean;
  isLegal?: boolean;
  isCritical?: boolean;
}


export interface ProjectedGraphNode extends GraphNode {
  x1: number;
  y2: number;
  z2: number;
  scale: number;
  screenX: number;
  screenY: number;
  screenRadius: number;
  isDimmed: boolean;
  isSelected: boolean;
  isHovered: boolean;
  isConnected: boolean;
}
