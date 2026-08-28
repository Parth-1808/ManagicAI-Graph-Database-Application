import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Layers, 
  GitFork, 
  ShieldAlert,
  Search
} from 'lucide-react';
import { WorkspaceViewTab } from '@/hooks/useWorkspaceFilters';

export interface WorkspaceTabsNavProps {
  activeTab: WorkspaceViewTab;
  onTabChange: (tab: WorkspaceViewTab) => void;
  invitesCount: number;
  eventsCount: number;
  collabsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const WorkspaceTabsNav: React.FC<WorkspaceTabsNavProps> = ({
  activeTab,
  onTabChange,
  invitesCount,
  eventsCount,
  collabsCount,
  searchQuery,
  onSearchChange,
}) => {
  const tabs = [
    { id: 'all' as WorkspaceViewTab, label: 'All Operations', icon: Layers, count: invitesCount + eventsCount + collabsCount },
    { id: 'invites' as WorkspaceViewTab, label: 'Pending Invites', icon: Sparkles, count: invitesCount },
    { id: 'events' as WorkspaceViewTab, label: 'Call-Sheets & Events', icon: Calendar, count: eventsCount },
    { id: 'collabs' as WorkspaceViewTab, label: 'Brand Collabs', icon: GitFork, count: collabsCount },
    { id: 'conflicts' as WorkspaceViewTab, label: 'Conflict Radar', icon: ShieldAlert, count: 0, badgeText: '0 Clashes' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-purple-100/80 shadow-2xs">
      {/* Tab Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50/60'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.badgeText ? (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-purple-700 text-purple-100' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {tab.badgeText}
                </span>
              ) : (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-purple-700 text-purple-100' : 'bg-purple-100/70 text-purple-800'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Search */}
      <div className="relative min-w-[200px] sm:min-w-[260px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter workspace items..."
          className="w-full pl-9 pr-4 py-1.5 bg-white border border-purple-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400/40"
        />
      </div>
    </div>
  );
};
