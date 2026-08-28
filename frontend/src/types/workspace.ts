export type WorkspaceItemType =
  | 'email'
  | 'meeting'
  | 'task'
  | 'event'
  | 'dispute'
  | 'project'
  | 'milestone'
  | 'adr';

export type WorkspacePriority = 'critical' | 'high' | 'medium' | 'low';

export type WorkspaceStatus =
  | 'open'
  | 'in-progress'
  | 'in_progress'
  | 'completed'
  | 'blocked'
  | 'at_risk'
  | 'scheduled'
  | 'overdue'
  | 'resolved';

export type WorkspaceTab =
  | 'grid'
  | 'invitations'
  | 'events'
  | 'collabs'
  | 'all'
  | 'inbox'
  | 'meetings'
  | 'tasks'
  | 'disputes';

export type WorkspaceSortBy = 'newest' | 'priority' | 'due-date';

export interface WorkspaceInvitation {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  sender: {
    name: string;
    email?: string;
    role: string;
    avatar?: string;
  };
  project: string;
  type: 'collab' | 'event' | 'project' | 'review';
  date: string;
  time: string;
  expiresIn?: string;
  status: 'pending' | 'accepted' | 'declined';
  tags: string[];
  attendeeCount?: number;
}

export interface WorkspaceEventItem {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  time: string;
  date: string;
  dayBadge?: string;
  location: string;
  category: 'Review' | 'Meeting' | 'Milestone' | 'Workshop' | 'Launch' | 'Sync';
  host: {
    name: string;
    avatar?: string;
    role?: string;
  };
  attendees: {
    name: string;
    avatar?: string;
    role?: string;
  }[];
  attendeesCount: number;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  joinUrl?: string;
  isRSVPed: boolean;
  project?: string;
}

export interface WorkspaceCollab {
  id: string;
  title: string;
  description: string;
  project: string;
  coverImage?: string;
  themeColor?: string;
  lead: {
    name: string;
    role: string;
    avatar?: string;
  };
  collaborators: {
    name: string;
    avatar?: string;
    role?: string;
  }[];
  status: 'active' | 'in_review' | 'planning' | 'paused' | 'completed';
  progress: number;
  tasksCount: number;
  completedTasks: number;
  openDisputes: number;
  lastActivity: string;
  tags: string[];
  priority: WorkspacePriority;
}

export interface WorkspaceConnection {
  type:
    | 'dispute'
    | 'task'
    | 'project'
    | 'meeting'
    | 'email'
    | 'milestone'
    | 'person'
    | 'adr'
    | string;
  label: string;
  severity: 'critical' | 'warning' | 'info';
  id: string;
  relation?: string;
}

export interface WorkspaceItem {
  id: string;
  type: WorkspaceItemType;
  title: string;
  subtitle: string;
  timestamp: string;
  time: string;
  project?: string;
  sender?: string;
  attendees?: string[];
  attendeeCount?: number;
  dueDate?: string;
  status?: WorkspaceStatus;
  priority: WorkspacePriority;
  connections: WorkspaceConnection[];
  isRead: boolean;
  isActionRequired: boolean;
  dayGroup: 'today' | 'yesterday' | 'earlier';
  dependencyHealth?: 'clear' | 'has-dependencies' | 'blocking-downstream';
  actionItemsCount?: number;
  unresolvedIssues?: number;
  involvedPeople?: string[];
  impactMetrics?: {
    blockedTasks: number;
    connectedMeetings: number;
    relatedEmails: number;
  };
}
