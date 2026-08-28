'use client';

import { create } from 'zustand';
import {
  WorkspaceItem,
  WorkspaceTab,
  WorkspaceSortBy,
  WorkspaceInvitation,
  WorkspaceEventItem,
  WorkspaceCollab,
  GraphNodeData,
  GraphEdgeData,
  ImpactTelemetry,
  IntelligenceInsight,
  CommunicationTelemetry,
  CentralityRanking,
  CalendarEvent,
} from '@/types';
import { workspaceService } from '@/services/workspaceService';
import { graphService } from '@/services/graphService';
import { intelligenceService } from '@/services/intelligenceService';
import { overviewService, calendarService } from '@/services/calendarService';

export interface OverviewSummaryData {
  healthScore: number;
  healthDiff: string;
  needAttentionCount: number;
  blockedTasksCount: number;
  meetingsTodayCount: number;
  commercialPipeline?: string;
  filmCount?: number;
  brandCount?: number;
  taskCount?: number;
  priorities: {
    rank: number;
    title: string;
    badge: string;
    subtitle: string;
  }[];
  todaysMeetings: any[];
  talent?: {
    name: string;
    role: string;
    avatar: string;
    portfolioValuation: string;
    clearanceScore: number;
    status: string;
    currentProject?: string;
    upcomingMilestone?: string;
  };
  films?: any[];
  talentRoster?: any[];
}

export interface WorkStore {
  // ── Overview State ──
  overviewSummary: OverviewSummaryData | null;
  filmsList: any[];
  talentRoster: any[];
  calendarEvents: Record<number, CalendarEvent[]>;
  calendarEventsList: CalendarEvent[];
  activities: any[];
  isLoadingOverview: boolean;

  // ── Workspace State ──
  workspaceItems: WorkspaceItem[];
  activeWorkspaceTab: WorkspaceTab;
  workspaceSearchQuery: string;
  workspaceSortBy: WorkspaceSortBy;
  contextDrawerItem: WorkspaceItem | null;
  isContextDrawerOpen: boolean;
  isLoadingWorkspace: boolean;

  // ── Workspace Specific Sections (Invitations, Events, Collabs) ──
  invitations: WorkspaceInvitation[];
  eventsList: WorkspaceEventItem[];
  collabs: WorkspaceCollab[];
  isScheduleModalOpen: boolean;

  // ── Intelligence State ──
  intelligenceInsights: IntelligenceInsight[];
  centralityRankings: CentralityRanking[];
  communicationTelemetry: CommunicationTelemetry | null;
  acceptedCollabs: any[];
  rejectedCollabs: any[];
  eventHistory: any[];
  monthlyEarnings: any[];
  yearlyEarnings: any[];
  isLoadingInsights: boolean;

  // ── Graph State ──
  graphNodes: GraphNodeData[];
  graphEdges: GraphEdgeData[];
  nodes3d: any[];
  edges3d: any[];
  isRiskSimulated: boolean;
  impactSummary: ImpactTelemetry | null;
  isLoadingGraph: boolean;

  // ── Modals / Drawers State ──
  isNLModalOpen: boolean;
  isImpactModalOpen: boolean;
  isExplainableDrawerOpen: boolean;
  isAskCoworkOpen: boolean;

  // ── Actions: Modals ──
  openNLModal: () => void;
  closeNLModal: () => void;
  openImpactModal: () => void;
  closeImpactModal: () => void;
  openExplainableDrawer: () => void;
  closeExplainableDrawer: () => void;
  openAskCowork: () => void;
  closeAskCowork: () => void;
  openScheduleModal: () => void;
  closeScheduleModal: () => void;

  // ── Actions: Workspace Hub & Sections ──
  setWorkspaceTab: (tab: WorkspaceTab) => void;
  setWorkspaceSearch: (query: string) => void;
  setWorkspaceSort: (sort: WorkspaceSortBy) => void;
  openContextDrawer: (item: WorkspaceItem) => void;
  closeContextDrawer: () => void;
  toggleItemRead: (id: string) => void;
  completeTask: (id: string) => void;
  resolveDispute: (id: string) => void;
  acceptInvitation: (id: string) => void;
  declineInvitation: (id: string) => void;
  toggleEventRSVP: (id: string) => void;
  addEventItem: (event: WorkspaceEventItem) => void;
  addInvitationItem: (invitation: WorkspaceInvitation) => void;
  addCollabItem: (collab: WorkspaceCollab) => void;
  scheduleItem: (payload: {
    type: 'event' | 'invitation' | 'collab';
    title: string;
    description: string;
    date: string;
    time: string;
    project: string;
    priority?: 'critical' | 'high' | 'medium' | 'low';
    category?: string;
    location?: string;
    recipientName?: string;
    recipientRole?: string;
  }) => Promise<boolean>;

  // ── Actions: Calendar Real Sync ──
  addCalendarEvent: (event: CalendarEvent) => Promise<boolean>;
  deleteCalendarEvent: (id: string) => Promise<boolean>;

  // ── Actions: Graph Reasoning & Simulation ──
  simulateRisk: () => void;
  resolveRisk: () => void;

  // ── Actions: API Hydration & Mutations ──
  fetchOverviewSummary: () => Promise<void>;
  fetchCalendarEvents: () => Promise<void>;
  fetchWorkspaceItems: () => Promise<void>;
  createWorkspaceItem: (payload: {
    title: string;
    type: string;
    description: string;
    priority: string;
    dateKey?: number;
    time?: string;
    connectedNodeId?: string;
  }) => Promise<boolean>;
  resolveDisputeApi: (disputeId?: string) => Promise<boolean>;
  fetchIntelligenceInsights: () => Promise<void>;
  fetchActivities: () => Promise<void>;
  fetchGraphData: () => Promise<void>;
  computePathApi: (fromId: string, toId: string) => Promise<string[]>;
  computeImpactApi: (rootId: string) => Promise<string[]>;
}

export const useWorkStore = create<WorkStore>((set, get) => ({
  // Overview State
  overviewSummary: null,
  filmsList: [],
  talentRoster: [],
  calendarEvents: {},
  calendarEventsList: [],
  activities: [],
  isLoadingOverview: false,

  // Workspace State
  workspaceItems: [],
  activeWorkspaceTab: 'grid',
  workspaceSearchQuery: '',
  workspaceSortBy: 'newest',
  contextDrawerItem: null,
  isContextDrawerOpen: false,
  isLoadingWorkspace: false,

  // Workspace Specific Sections
  invitations: [],
  eventsList: [],
  collabs: [],
  isScheduleModalOpen: false,

  // Intelligence State
  intelligenceInsights: [],
  centralityRankings: [],
  communicationTelemetry: null,
  acceptedCollabs: [],
  rejectedCollabs: [],
  eventHistory: [],
  monthlyEarnings: [],
  yearlyEarnings: [],
  isLoadingInsights: false,

  // Graph State
  graphNodes: [],
  graphEdges: [],
  nodes3d: [],
  edges3d: [],
  isRiskSimulated: false,
  impactSummary: null,
  isLoadingGraph: false,

  // Modals State
  isNLModalOpen: false,
  isImpactModalOpen: false,
  isExplainableDrawerOpen: false,
  isAskCoworkOpen: false,

  // Modal Actions
  openNLModal: () => set({ isNLModalOpen: true }),
  closeNLModal: () => set({ isNLModalOpen: false }),
  openImpactModal: () => set({ isImpactModalOpen: true }),
  closeImpactModal: () => set({ isImpactModalOpen: false }),
  openExplainableDrawer: () => set({ isExplainableDrawerOpen: true }),
  closeExplainableDrawer: () => set({ isExplainableDrawerOpen: false }),
  openAskCowork: () => set({ isAskCoworkOpen: true }),
  closeAskCowork: () => set({ isAskCoworkOpen: false }),
  openScheduleModal: () => set({ isScheduleModalOpen: true }),
  closeScheduleModal: () => set({ isScheduleModalOpen: false }),

  // Workspace Actions
  setWorkspaceTab: (tab) => set({ activeWorkspaceTab: tab }),
  setWorkspaceSearch: (query) => set({ workspaceSearchQuery: query }),
  setWorkspaceSort: (sort) => set({ workspaceSortBy: sort }),
  openContextDrawer: (item) => set({ contextDrawerItem: item, isContextDrawerOpen: true }),
  closeContextDrawer: () => set({ isContextDrawerOpen: false, contextDrawerItem: null }),

  toggleItemRead: (id) => {
    set((state) => ({
      workspaceItems: state.workspaceItems.map((item) =>
        item.id === id ? { ...item, isRead: !item.isRead } : item
      ),
    }));
  },

  completeTask: (id) => {
    set((state) => ({
      workspaceItems: state.workspaceItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'completed',
            }
          : item
      ),
    }));
  },

  resolveDispute: (id) => {
    set((state) => ({
      workspaceItems: state.workspaceItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'resolved',
            }
          : item
      ),
      isRiskSimulated: false,
    }));
  },

  acceptInvitation: (id) => {
    set((state) => ({
      invitations: state.invitations.map((inv) =>
        inv.id === id ? { ...inv, status: 'accepted' } : inv
      ),
    }));
  },

  declineInvitation: (id) => {
    set((state) => ({
      invitations: state.invitations.map((inv) =>
        inv.id === id ? { ...inv, status: 'declined' } : inv
      ),
    }));
  },

  toggleEventRSVP: (id) => {
    set((state) => ({
      eventsList: state.eventsList.map((evt) =>
        evt.id === id ? { ...evt, isRSVPed: !evt.isRSVPed } : evt
      ),
    }));
  },

  addEventItem: (event) => {
    set((state) => ({
      eventsList: [event, ...state.eventsList],
    }));
  },

  addInvitationItem: (invitation) => {
    set((state) => ({
      invitations: [invitation, ...state.invitations],
    }));
  },

  addCollabItem: (collab) => {
    set((state) => ({
      collabs: [collab, ...state.collabs],
    }));
  },

  addCalendarEvent: async (event: CalendarEvent) => {
    // 1. Immediately update calendar events state
    set((state) => {
      const updatedList = [event, ...state.calendarEventsList.filter((e) => e.id !== event.id)];
      const updatedGrouped = { ...state.calendarEvents };
      if (!updatedGrouped[event.dateKey]) {
        updatedGrouped[event.dateKey] = [];
      }
      updatedGrouped[event.dateKey] = [event, ...updatedGrouped[event.dateKey].filter((e) => e.id !== event.id)];

      // Also create corresponding workspace event
      const newWsEvent: WorkspaceEventItem = {
        id: event.id,
        title: event.title,
        description: event.description || `Scheduled ${event.category} - ${event.brandOrClient || 'Managic Operation'}`,
        time: event.time || '10:00 AM',
        date: `Aug ${event.dateKey}, ${event.year || 2026}`,
        dayBadge: event.dateKey === 28 ? 'TODAY' : event.dateKey === 29 ? 'TOMORROW' : `AUG ${event.dateKey}`,
        location: event.location || 'Mumbai / YRF Studios',
        category: (event.category || 'Milestone') as any,
        host: {
          name: event.brandOrClient || 'Manager Office',
          role: 'Lead Producer / Partner',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        attendees: [
          { name: 'Lead Talent', avatar: '/founder.jpg' },
        ],
        attendeesCount: 8,
        status: 'upcoming',
        isRSVPed: true,
        project: event.brandOrClient || 'Managic Production',
      };

      // Also add Graph Node
      const newGraphNode: GraphNodeData = {
        id: event.id,
        label: event.title,
        type: 'event',
        subtitle: `${event.time || '10:00 AM'} • ${event.category}`,
        status: 'normal',
        details: {
          description: event.description || `Scheduled ${event.category} for Talent Roster`,
          valuation: event.amount,
          owner: event.brandOrClient,
        },
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      };

      const newGraphEdge: GraphEdgeData = {
        id: `edge-${event.id}`,
        from: 'root-hrithik',
        to: event.id,
        relation: 'ATTENDS_GALAS',
      };

      return {
        calendarEventsList: updatedList,
        calendarEvents: updatedGrouped,
        eventsList: [newWsEvent, ...state.eventsList.filter((e) => e.id !== event.id)],
        graphNodes: [newGraphNode, ...state.graphNodes.filter((n) => n.id !== event.id)],
        graphEdges: [newGraphEdge, ...state.graphEdges.filter((e) => e.to !== event.id)],
      };
    });

    // 2. Persist to CognoDB Backend via API
    try {
      await calendarService.createEvent(event);
      return true;
    } catch {
      return true;
    }
  },

  deleteCalendarEvent: async (id: string) => {
    set((state) => {
      const updatedList = state.calendarEventsList.filter((e) => e.id !== id);
      const updatedGrouped: Record<number, CalendarEvent[]> = {};
      updatedList.forEach((e) => {
        if (!updatedGrouped[e.dateKey]) updatedGrouped[e.dateKey] = [];
        updatedGrouped[e.dateKey].push(e);
      });

      return {
        calendarEventsList: updatedList,
        calendarEvents: updatedGrouped,
        eventsList: state.eventsList.filter((e) => e.id !== id),
        graphNodes: state.graphNodes.filter((n) => n.id !== id),
        graphEdges: state.graphEdges.filter((e) => e.to !== id),
      };
    });

    try {
      await calendarService.deleteEvent(id);
      return true;
    } catch {
      return true;
    }
  },

  scheduleItem: async (payload) => {
    const newId = `${payload.type}-${Date.now()}`;
    const parsedDateKey = parseInt(payload.date.replace(/[^0-9]/g, ''), 10) || 28;

    if (payload.type === 'event') {
      const newEvent: WorkspaceEventItem = {
        id: newId,
        title: payload.title,
        description: payload.description,
        time: payload.time,
        date: payload.date,
        dayBadge: parsedDateKey === 28 ? 'TODAY' : parsedDateKey === 29 ? 'TOMORROW' : `AUG ${parsedDateKey}`,
        location: payload.location || 'YRF Studios / Mumbai',
        category: (payload.category as any) || 'Milestone',
        host: {
          name: payload.recipientName || 'Manager Office',
          role: payload.recipientRole || 'Producer / Director',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        attendees: [
          { name: 'Lead Talent', avatar: '/founder.jpg' },
        ],
        attendeesCount: 5,
        status: 'upcoming',
        isRSVPed: true,
        project: payload.project,
      };

      const calEvent: CalendarEvent = {
        id: newId,
        dateKey: parsedDateKey,
        month: 7, // August
        year: 2026,
        title: payload.title,
        brandOrClient: payload.project,
        time: payload.time,
        category: 'Shoot',
        location: payload.location,
        description: payload.description,
        status: 'pending',
      };

      await get().addCalendarEvent(calEvent);
      get().addEventItem(newEvent);
    } else if (payload.type === 'invitation') {
      const newInv: WorkspaceInvitation = {
        id: newId,
        title: payload.title,
        description: payload.description,
        sender: {
          name: payload.recipientName || 'Brand Partner',
          role: payload.recipientRole || 'Creative Director',
          email: 'partnerships@talentmanagement.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        project: payload.project,
        type: 'collab',
        date: payload.date,
        time: payload.time,
        expiresIn: 'Expires in 3 days',
        status: 'pending',
        tags: [payload.category || 'Deal', 'VVIP'],
        attendeeCount: 10,
      };
      get().addInvitationItem(newInv);
    } else {
      const newCollab: WorkspaceCollab = {
        id: newId,
        title: payload.title,
        description: payload.description,
        project: payload.project,
        lead: {
          name: payload.recipientName || 'Lead Talent Manager',
          role: payload.recipientRole || 'Executive Agent',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        },
        collaborators: [
          { name: 'Afsar Zaidi', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', role: 'Managing Partner' }
        ],
        status: 'active',
        progress: 10,
        tasksCount: 6,
        completedTasks: 1,
        openDisputes: 0,
        lastActivity: 'Just now · Scheduled into Talent Workspace',
        tags: [payload.category || 'Campaign', 'Contract'],
        priority: payload.priority || 'high',
      };
      get().addCollabItem(newCollab);
    }

    // Persist to CognoDB
    await get().createWorkspaceItem({
      title: payload.title,
      type: payload.type,
      description: payload.description,
      priority: payload.priority || 'medium',
      dateKey: parsedDateKey,
      time: payload.time,
    });

    return true;
  },

  simulateRisk: () => {
    set({
      isRiskSimulated: true,
      impactSummary: {
        blockedTasksCount: 4,
        delayedApprovalsCount: 2,
        potentialDaysDelay: 5,
        stalledBudget: '₹45 Lakhs',
      },
    });
  },

  resolveRisk: () => {
    set({
      isRiskSimulated: false,
      impactSummary: null,
    });
  },

  // API Hydrations from CognoDB
  fetchOverviewSummary: async () => {
    set({ isLoadingOverview: true });
    try {
      const data = await overviewService.getSummary();
      if (data) {
        set({
          overviewSummary: data,
          filmsList: data.films || [],
          talentRoster: data.talentRoster || [],
          isLoadingOverview: false,
        });
      }
    } catch {
      set({ isLoadingOverview: false });
    }
  },

  fetchCalendarEvents: async () => {
    try {
      const data = await calendarService.getEvents();
      if (data?.events) {
        const grouped: Record<number, CalendarEvent[]> = data.eventsMap || {};
        if (!data.eventsMap) {
          data.events.forEach((evt) => {
            if (!grouped[evt.dateKey]) grouped[evt.dateKey] = [];
            grouped[evt.dateKey].push(evt);
          });
        }
        set({ calendarEvents: grouped, calendarEventsList: data.events });
      }
    } catch {
      // Fallback
    }
  },

  fetchActivities: async () => {
    try {
      const res = await fetch('/api/activities');
      if (res.ok) {
        const data = await res.json();
        if (data?.activities) {
          set({ activities: data.activities });
        }
      }
    } catch {
      // Fallback
    }
  },

  fetchWorkspaceItems: async () => {
    set({ isLoadingWorkspace: true });
    try {
      const data: any = await workspaceService.getItems();
      if (data) {
        set({
          workspaceItems: data.items || [],
          invitations: data.invitations || [],
          eventsList: data.eventsList || [],
          collabs: data.collabs || [],
          isLoadingWorkspace: false,
        });
      } else {
        set({ isLoadingWorkspace: false });
      }
    } catch {
      set({ isLoadingWorkspace: false });
    }
  },

  createWorkspaceItem: async (payload) => {
    try {
      const data = await workspaceService.createItem(payload);
      if (data?.success && data?.item) {
        set((state) => ({ workspaceItems: [data.item!, ...state.workspaceItems] }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  resolveDisputeApi: async (disputeId) => {
    try {
      const res = await workspaceService.resolveDispute(disputeId);
      if (res?.success) {
        get().resolveRisk();
        await get().fetchWorkspaceItems();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  fetchIntelligenceInsights: async () => {
    set({ isLoadingInsights: true });
    try {
      const data = await intelligenceService.getInsights();
      if (data) {
        set({
          intelligenceInsights: data.insights || [],
          centralityRankings: data.centralityRankings || [],
          communicationTelemetry: data.communicationTelemetry || null,
          acceptedCollabs: data.acceptedCollabs || [],
          rejectedCollabs: data.rejectedCollabs || [],
          eventHistory: data.eventHistory || [],
          monthlyEarnings: data.monthlyEarnings || [],
          yearlyEarnings: data.yearlyEarnings || [],
          isLoadingInsights: false,
        });
      }
    } catch {
      set({ isLoadingInsights: false });
    }
  },

  fetchGraphData: async () => {
    set({ isLoadingGraph: true });
    try {
      const data = await graphService.getSubgraph();
      if (data) {
        set({
          graphNodes: data.nodes || [],
          graphEdges: data.edges || [],
          nodes3d: data.nodes3d || [],
          edges3d: data.edges3d || [],
          isLoadingGraph: false,
        });
      }
    } catch {
      set({ isLoadingGraph: false });
    }
  },

  computePathApi: async (fromId, toId) => {
    try {
      const res = await graphService.computePath(fromId, toId);
      return res?.path || [];
    } catch {
      return [];
    }
  },

  computeImpactApi: async (rootId) => {
    try {
      const res = await graphService.computeImpact(rootId);
      return res?.impactedNodeIds || [];
    } catch {
      return [];
    }
  },
}));
