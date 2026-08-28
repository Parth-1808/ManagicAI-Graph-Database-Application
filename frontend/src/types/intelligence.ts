export type IntelligenceCategory =
  | 'risk'
  | 'dependency'
  | 'people'
  | 'communication'
  | 'opportunity';

export type InsightSeverity =
  | 'critical'
  | 'warning'
  | 'info'
  | 'opportunity';

export interface EvidenceTrailItem {
  from: string;
  to: string;
  relation: string;
  type: 'dispute' | 'task' | 'meeting' | 'email' | 'person' | 'project' | 'milestone' | 'adr' | 'event' | string;
}

export interface InsightMetric {
  label: string;
  value: string | number;
  sublabel: string;
}

export interface SuggestedAction {
  label: string;
  type: 'impact_modal' | 'graph_link' | 'ask_cowork' | 'custom';
  actionPayload?: string;
}

export interface IntelligenceInsight {
  id: string;
  category: IntelligenceCategory;
  severity: InsightSeverity;
  title: string;
  subtitle: string;
  timestamp: string;
  whyDetected: string[];
  evidenceTrail: EvidenceTrailItem[];
  impactMetrics?: InsightMetric[];
  suggestedAction: SuggestedAction;
}

export interface ImpactTelemetry {
  blockedTasksCount: number;
  delayedApprovalsCount: number;
  potentialDaysDelay: number;
  stalledBudget?: string;
}

export interface DelaySimulationResult {
  affectedTasks: number;
  rescheduledMeetings: number;
  deploymentDelayDays: number;
  criticalRisk: boolean;
}

export interface CentralityRanking {
  id: string;
  name: string;
  role: string;
  team: string;
  degree: number;
  email?: string;
  avatar?: string;
  centralityScore?: number;
  ownedTasksCount?: number;
  disputesInvolvedCount?: number;
  meetingsAttendedCount?: number;
  emailsSentCount?: number;
}

export interface CommunicationTelemetry {
  totalEmailVolume: number;
  totalEmailsCount: number;
  unrecordedEmailCount: number;
  hasMissingAdr: boolean;
  adrTaskTitle?: string;
  adrTaskStatus?: string;
  activeDisputeTitle?: string;
  activeDisputeId?: string;
  emailThreads?: string[];
  discussants?: string[];
}

// ── Earnings & Collab Intelligence Types ──
export interface EarningsBreakdownItem {
  name: string;
  value: number;
  display: string;
  percent: number;
  color: string;
  growth: string;
}

export interface AcceptedCollab {
  id: string;
  brand: string;
  category: string;
  payout: string;
  deliverables: string;
  status: 'Signed & Escrowed' | 'Active Agreement';
  exclusivity: string;
  duration: string;
  location: string;
}

export interface RejectedCollab {
  id: string;
  brand: string;
  category: string;
  offeredPayout: string;
  conflictRationale: string;
  conflictingEntity: string;
  resolvedStatus: 'Conflict Rejected' | 'AI Shield Blocked';
  protectionValue: string;
}
