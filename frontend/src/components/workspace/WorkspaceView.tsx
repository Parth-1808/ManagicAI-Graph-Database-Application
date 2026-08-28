'use client';

import React, { useEffect } from 'react';
import { useWorkStore } from '@/store/useWorkStore';
import { useWorkspaceFilters } from '@/hooks/useWorkspaceFilters';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceTabsNav } from './WorkspaceTabsNav';
import { WorkspaceInvitationsList } from './WorkspaceInvitationsList';
import { WorkspaceEventsList } from './WorkspaceEventsList';
import { WorkspaceCollabsGrid } from './WorkspaceCollabsGrid';
import { WorkspaceConflictsAlerts } from './WorkspaceConflictsAlerts';
import { ScheduleModal } from './ScheduleModal';
import { EmptyState } from '@/components/common/EmptyState';

export const WorkspaceView: React.FC = () => {
  const {
    invitations,
    eventsList,
    collabs,
    acceptInvitation,
    declineInvitation,
    toggleEventRSVP,
    openScheduleModal,
    isScheduleModalOpen,
    closeScheduleModal,
    fetchWorkspaceItems,
    isLoadingWorkspace,
  } = useWorkStore();

  useEffect(() => {
    fetchWorkspaceItems();
  }, [fetchWorkspaceItems]);

  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filterProject,
    setFilterProject,
    filteredInvites,
    filteredEvents,
    filteredCollabs,
    activeProjects,
  } = useWorkspaceFilters({
    invitations,
    events: eventsList,
    collabs,
  });

  const showAll = activeTab === 'all';
  const showInvites = showAll || activeTab === 'invites';
  const showEvents = showAll || activeTab === 'events';
  const showCollabs = showAll || activeTab === 'collabs';
  const showConflicts = showAll || activeTab === 'conflicts';

  const hasAnyResults =
    filteredInvites.length > 0 ||
    filteredEvents.length > 0 ||
    filteredCollabs.length > 0;

  const isTabEmpty = (() => {
    if (activeTab === 'all') return !hasAnyResults;
    if (activeTab === 'invites') return filteredInvites.length === 0;
    if (activeTab === 'events') return filteredEvents.length === 0;
    if (activeTab === 'collabs') return filteredCollabs.length === 0;
    return false;
  })();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <WorkspaceHeader
        filterProject={filterProject}
        onFilterProjectChange={setFilterProject}
        projectsList={activeProjects}
        onOpenSchedule={openScheduleModal}
      />

      {/* Tabs Navigation & Search Bar */}
      <WorkspaceTabsNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        invitesCount={filteredInvites.length}
        eventsCount={filteredEvents.length}
        collabsCount={filteredCollabs.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Conflict Radar Always Visible on Top of Operations or in Conflicts tab */}
      {showConflicts && <WorkspaceConflictsAlerts />}

      {/* Empty State if filter yields nothing */}
      {isTabEmpty && !isLoadingWorkspace && (
        <EmptyState
          title={`No Matching ${activeTab === 'all' ? 'Operations' : activeTab.toUpperCase()} Found`}
          description={
            searchQuery
              ? `No ${activeTab === 'all' ? 'invitations, events, or collabs' : activeTab} match your search criteria for "${searchQuery}".`
              : `No ${activeTab === 'all' ? 'operations' : activeTab} found for the selected project filter.`
          }
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setFilterProject('all');
            setActiveTab('all');
          }}
        />
      )}

      {/* Dynamic Sections */}
      {showInvites && (
        <WorkspaceInvitationsList
          invitations={filteredInvites}
          onAccept={acceptInvitation}
          onDecline={declineInvitation}
        />
      )}

      {showEvents && (
        <WorkspaceEventsList
          events={filteredEvents}
          onToggleRSVP={toggleEventRSVP}
        />
      )}

      {showCollabs && (
        <WorkspaceCollabsGrid collabs={filteredCollabs} />
      )}

      {/* Schedule / Add Itinerary Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={closeScheduleModal}
      />
    </div>
  );
};
