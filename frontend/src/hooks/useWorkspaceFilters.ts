import { useState, useMemo } from 'react';
import { WorkspaceInvitation, WorkspaceEventItem, WorkspaceCollab } from '@/types';

export type WorkspaceViewTab = 'all' | 'invites' | 'events' | 'collabs' | 'conflicts';

interface UseWorkspaceFiltersOptions {
  invitations: WorkspaceInvitation[];
  events: WorkspaceEventItem[];
  collabs: WorkspaceCollab[];
}

export function useWorkspaceFilters({
  invitations = [],
  events = [],
  collabs = [],
}: UseWorkspaceFiltersOptions) {
  const [activeTab, setActiveTab] = useState<WorkspaceViewTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState('all');

  const safeSearch = (searchQuery || '').trim().toLowerCase();

  const pendingInvitesCount = useMemo(
    () => (invitations || []).filter((i) => i?.status === 'pending').length,
    [invitations]
  );

  const filteredInvites = useMemo(() => {
    return (invitations || []).filter((inv) => {
      if (!inv) return false;
      const title = (inv.title || (inv as any).subject || '').toLowerCase();
      const desc = (inv.description || (inv as any).body || '').toLowerCase();
      const project = (inv.project || '').toLowerCase();
      const senderName = (
        typeof inv.sender === 'object' && inv.sender?.name
          ? inv.sender.name
          : String(inv.sender || '')
      ).toLowerCase();

      const matchesSearch =
        !safeSearch ||
        title.includes(safeSearch) ||
        desc.includes(safeSearch) ||
        project.includes(safeSearch) ||
        senderName.includes(safeSearch);

      const matchesProject =
        filterProject === 'all' || inv.project === filterProject;
      return matchesSearch && matchesProject;
    });
  }, [invitations, safeSearch, filterProject]);

  const filteredEvents = useMemo(() => {
    return (events || []).filter((evt) => {
      if (!evt) return false;
      const title = (evt.title || '').toLowerCase();
      const desc = (evt.description || '').toLowerCase();
      const project = (evt.project || '').toLowerCase();
      const location = (evt.location || '').toLowerCase();

      const matchesSearch =
        !safeSearch ||
        title.includes(safeSearch) ||
        desc.includes(safeSearch) ||
        project.includes(safeSearch) ||
        location.includes(safeSearch);

      const matchesProject =
        filterProject === 'all' || evt.project === filterProject;
      return matchesSearch && matchesProject;
    });
  }, [events, safeSearch, filterProject]);

  const filteredCollabs = useMemo(() => {
    return (collabs || []).filter((col) => {
      if (!col) return false;
      const title = (col.title || (col as any).brand || '').toLowerCase();
      const desc = (col.description || (col as any).deliverables || '').toLowerCase();
      const project = (col.project || (col as any).brand || '').toLowerCase();

      const matchesSearch =
        !safeSearch ||
        title.includes(safeSearch) ||
        desc.includes(safeSearch) ||
        project.includes(safeSearch);

      const matchesProject =
        filterProject === 'all' ||
        col.project === filterProject ||
        (col as any).brand === filterProject;
      return matchesSearch && matchesProject;
    });
  }, [collabs, safeSearch, filterProject]);

  const activeProjects = useMemo(() => {
    const set = new Set<string>();
    (invitations || []).forEach((i) => i?.project && set.add(i.project));
    (events || []).forEach((e) => e?.project && set.add(e.project));
    (collabs || []).forEach((c) => {
      if (c?.project) set.add(c.project);
      if ((c as any)?.brand) set.add((c as any).brand);
    });
    return Array.from(set);
  }, [invitations, events, collabs]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filterProject,
    setFilterProject,
    pendingInvitesCount,
    filteredInvites,
    filteredEvents,
    filteredCollabs,
    activeProjects,
  };
}
