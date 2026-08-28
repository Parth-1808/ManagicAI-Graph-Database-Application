import { workspaceRepository } from '../repositories/workspace.repository';
import { calendarRepository } from '../repositories/calendar.repository';
import { intelligenceRepository } from '../repositories/intelligence.repository';

export class WorkspaceService {
  async getWorkspaceData() {
    const [tasks, meetings, invites, disputes, brands, events] = await Promise.all([
      workspaceRepository.getTasks(),
      workspaceRepository.getMeetings(),
      workspaceRepository.getInvitations(),
      intelligenceRepository.getRejectedDisputes(),
      intelligenceRepository.getAcceptedBrandDeals(),
      calendarRepository.getEvents(),
    ]);

    const items = [
      ...tasks.map((t: any) => ({
        id: t.id,
        title: t.title || 'Untitled Task',
        subtitle: t.studio ? `${t.studio} • ${t.role || 'Task'}` : t.role || 'Production Task',
        type: 'task' as const,
        description: t.description || '',
        priority: t.priority || 'medium',
        status: t.status || 'open',
        dateKey: t.dateKey || 28,
        time: t.time || '10:00 AM',
        timestamp: new Date().toISOString(),
        location: t.location || 'Mumbai / YRF Studios',
        role: t.role,
        category: t.category,
        connections: [],
        isRead: false,
        isActionRequired: t.priority === 'critical',
        dayGroup: 'today' as const,
      })),
      ...meetings.map((m: any) => ({
        id: m.id,
        title: m.title || 'Untitled Meeting',
        subtitle: m.location || 'Virtual Sync',
        type: 'meeting' as const,
        description: m.description || '',
        priority: m.priority || 'medium',
        status: m.status || 'scheduled',
        dateKey: m.dateKey || 28,
        time: m.time || '11:00 AM',
        timestamp: new Date().toISOString(),
        location: m.location || 'Studio',
        attendeeCount: m.attendeeCount || 2,
        connections: [],
        isRead: false,
        isActionRequired: false,
        dayGroup: 'today' as const,
      })),
      ...disputes.map((d: any) => ({
        id: d.id,
        title: d.brand || 'Commercial Inquiry',
        subtitle: d.riskTag || 'Conflict Radar Flag',
        type: 'dispute' as const,
        description: d.proposedDeliverables || d.description || '',
        priority: d.riskLevel || 'critical',
        status: 'blocked' as const,
        riskTag: d.riskTag,
        timestamp: new Date().toISOString(),
        time: 'Pending Review',
        connections: [],
        isRead: false,
        isActionRequired: true,
        dayGroup: 'today' as const,
      })),
    ];

    // Normalized Invitations adhering strictly to WorkspaceInvitation
    const invitations = invites.map((inv: any) => {
      const senderName = inv.senderName || (typeof inv.sender === 'string' ? inv.sender : 'Brand Partner');
      return {
        id: inv.id,
        title: inv.title || 'VIP Conclave & Brand Ambassadorship',
        description: inv.description || 'Exclusive collaboration and presence request.',
        project: inv.project || 'General Operation',
        type: inv.type || 'collab',
        date: inv.date || 'Today',
        time: inv.time || '10:00 AM',
        status: inv.status || 'pending',
        priority: inv.priority || 'high',
        attendeeCount: inv.attendeeCount || 1,
        tags: ['VVIP', inv.type || 'Deal'],
        sender: {
          name: senderName,
          role: inv.senderRole || 'Executive Partner',
          avatar: inv.senderAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
      };
    });

    // Normalized Events adhering strictly to WorkspaceEventItem
    const eventsList = events.map((evt: any) => {
      const dateKeyNum = Number(evt.dateKey) || 28;
      const titleStr = evt.title || 'Production Schedule Milestone';
      return {
        id: evt.id,
        title: titleStr,
        description: evt.description || 'Live Call-sheet & Pre-Viz Milestone',
        time: evt.time || '10:00 AM',
        date: evt.date || 'August 2026',
        dayBadge: dateKeyNum === 28 ? 'TODAY' : dateKeyNum === 29 ? 'TOMORROW' : `AUG ${dateKeyNum}`,
        location: evt.location || 'Mumbai / YRF Studios',
        category: (evt.type || 'Milestone') as any,
        host: {
          name: 'YRF Production Desk',
          role: 'Lead Producer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        attendees: [{ name: 'Lead Talent', avatar: '/hrithik-welcome.png' }],
        attendeesCount: Number(evt.attendees) || 8,
        status: evt.status || 'upcoming',
        isRSVPed: true,
        project: titleStr.includes('WAR') ? 'War 2' : titleStr.includes('KRRISH') ? 'Krrish 4' : 'Global Ambassadorship',
      };
    });

    // Normalized Collabs adhering strictly to WorkspaceCollab
    const collabs = brands.map((b: any, index: number) => ({
      id: b.id || `collab-${index}`,
      title: b.brand ? `${b.brand} Ambassadorship` : 'Active Brand Partnership',
      description: b.deliverables || 'Global marketing campaign and promotional deliverables.',
      project: b.brand || 'Brand Venture',
      status: 'active' as const,
      progress: 60 + ((index * 10) % 35),
      tasksCount: 6,
      completedTasks: 3 + (index % 3),
      openDisputes: 0,
      lastActivity: '2h ago · Milestone verified',
      tags: [b.category || 'Luxury', 'Endorsement'],
      priority: 'high' as const,
      lead: {
        name: 'Afsar Zaidi',
        role: 'Managing Partner (Exceed)',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      },
      collaborators: [
        { name: 'Hrithik Roshan', avatar: '/hrithik-welcome.png', role: 'Global Ambassador' }
      ],
    }));

    return {
      items,
      invitations,
      eventsList,
      collabs,
      isLiveDb: true,
      timestamp: new Date().toISOString(),
    };
  }

  async createWorkspaceItem(payload: any) {
    const res = await workspaceRepository.createItem({
      id: `task-${Date.now()}`,
      title: payload.title || 'New Talent Milestone Task',
      type: payload.type || 'task',
      description: payload.description || 'Dynamic task created via ManagicAI Workspace',
      priority: payload.priority || 'medium',
      dateKey: Number(payload.dateKey || 28),
      time: payload.time || '10:00 AM',
      connectedNodeId: payload.connectedNodeId,
    });

    return {
      success: true,
      item: res.records[0],
      isLiveDb: true,
    };
  }

  async resolveDispute(disputeId = 'rej-1') {
    const res = await workspaceRepository.resolveDispute(disputeId);
    return {
      success: true,
      resolvedDispute: res.records[0],
      isLiveDb: true,
    };
  }
}

export const workspaceService = new WorkspaceService();
