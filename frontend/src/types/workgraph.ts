/**
 * Enterprise Work Graph Schema Type Definitions
 * Represents the primary graph entities, attributes, and relationships in CognoDB
 */
import type { WorkspacePriority } from './workspace';

export interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
  team: string;
  avatar?: string;
  centralityScore?: number;
}

export interface Dispute {
  id: string;
  title: string;
  subtitle?: string;
  status: 'open' | 'at_risk' | 'resolved' | 'escalated' | 'completed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  openedAt: string;
  description: string;
  blockedTasksCount?: number;
  scheduleImpactDays?: number;
  involvedPeople?: string[];
  resolvedAt?: string;
}

export interface Email {
  id: string;
  subject: string;
  sender: string;
  messageCount?: number;
  sentAt: string;
  hasDecisionRecorded?: boolean;
  priority?: 'high' | 'medium' | 'low';
  recipients?: string[];
  bodyPreview?: string;
}

export interface Meeting {
  id: string;
  title: string;
  subtitle?: string;
  scheduledAt: string;
  dateKey?: number;
  time?: string;
  attendees?: string[];
  attendeeCount?: number;
  status?: 'scheduled' | 'in_progress' | 'completed' | 'at_risk' | 'cancelled';
  unresolvedIssues?: number;
  recordingUrl?: string;
  summary?: string;
}

export interface Task {
  id: string;
  title: string;
  subtitle?: string;
  status: 'open' | 'in_progress' | 'blocked' | 'completed' | 'at_risk' | 'todo' | 'overdue';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate?: string;
  dateKey?: number;
  assignee?: string;
  projectId?: string;
  blockedBy?: string[];
}

export interface Project {
  id: string;
  name: string;
  subtitle?: string;
  healthScore?: number;
  status?: 'healthy' | 'at_risk' | 'blocked' | 'completed' | 'in_progress';
  targetLaunch?: string;
  owner?: string;
}

export interface Milestone {
  id: string;
  title: string;
  subtitle?: string;
  targetDate: string;
  dateKey?: number;
  status: 'scheduled' | 'at_risk' | 'completed' | 'delayed';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  projectId?: string;
}

export interface ADR {
  id: string;
  title: string;
  status: 'proposed' | 'accepted' | 'rejected' | 'superseded' | 'in_review';
  date?: string;
  author?: string;
  context?: string;
  decision?: string;
  consequences?: string;
  relatedDisputes?: string[];
  relatedProjects?: string[];
}

export interface TalentEntity {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  tier?: string;
  currentProject?: string;
  portfolioValuation?: string;
  clearanceScore?: number;
  status?: string;
  centralityScore?: number;
}

export interface FilmEntity {
  id: string;
  title: string;
  year?: string;
  role?: string;
  studio?: string;
  image?: string;
  status?: 'In Production' | 'Released' | 'Upcoming';
  statusBadge?: string;
  payday?: string;
  boxOffice?: string;
  budget?: string;
  director?: string;
}

export interface BrandEntity {
  id: string;
  brand: string;
  category: string;
  amount?: string;
  term?: string;
  signedDate?: string;
  deliverables?: string;
  statusTag?: string;
  priority?: WorkspacePriority;
  isShieldVerified?: boolean;
}

export interface VIPEventEntity {
  id: string;
  name: string;
  date: string;
  year?: string;
  location: string;
  role: string;
  reach?: string;
  status: string;
  styling?: string;
}

export interface LegalCovenantEntity {
  id: string;
  title: string;
  category: string;
  valuation?: string;
  status: string;
  beneficiary?: string;
  details?: string[];
}

export interface WorkGraphCalendarEvent {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  category: 'Shoot' | 'Brand Collab' | 'VIP Gala' | 'Meeting' | 'Review' | 'Deliverable' | 'Milestone' | string;
  badgeColor: string;
  completed?: boolean;
}

export type WorkGraphEntity =
  | Person
  | TalentEntity
  | FilmEntity
  | BrandEntity
  | VIPEventEntity
  | LegalCovenantEntity
  | Dispute
  | Email
  | Meeting
  | Task
  | Project
  | Milestone
  | ADR;

export type WorkGraphNodeType =
  | 'Person'
  | 'Talent'
  | 'Film'
  | 'Brand'
  | 'Event'
  | 'Covenant'
  | 'Hub'
  | 'Dispute'
  | 'Email'
  | 'Meeting'
  | 'Task'
  | 'Project'
  | 'Milestone'
  | 'ADR';

export type WorkGraphRelationshipType =
  | 'INVOLVED_IN'
  | 'STARS_IN'
  | 'DIRECTED_BY'
  | 'PRODUCED_BY'
  | 'REPRESENTS'
  | 'COMMERCIAL_EQUITY'
  | 'PROTECTED_BY'
  | 'LEGAL_GOVERNANCE'
  | 'EQUITY_STAKE'
  | 'ATTENDS_GALAS'
  | 'COLLIDES_WITH'
  | 'HIERARCHY'
  | 'LEADS_TECH'
  | 'LEADS_PLATFORM'
  | 'LEADS_FRONTEND'
  | 'SENT'
  | 'EVIDENCE_FOR'
  | 'CONCERNS'
  | 'DISCUSSED_IN'
  | 'MENTIONED'
  | 'GOVERNS'
  | 'ATTENDS'
  | 'BLOCKS'
  | 'ENABLES'
  | 'REQUIRED_FOR'
  | 'BLOCKS_RELEASE'
  | 'UNLOCKS'
  | 'PRECEDES'
  | 'PART_OF'
  | 'OWNS'
  | 'AUTHORS'
  | 'RESOLVES';
