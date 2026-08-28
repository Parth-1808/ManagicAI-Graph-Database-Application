import React from 'react';
import { Layers, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface WorkspaceHeaderProps {
  filterProject: string;
  onFilterProjectChange: (project: string) => void;
  projectsList: string[];
  onOpenSchedule: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  filterProject,
  onFilterProjectChange,
  projectsList,
  onOpenSchedule,
}) => {
  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(168,85,247,0.06)] relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="space-y-2 relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
          <Layers className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
          <span>CENTRALIZED WORKSPACE &amp; TALENT ROSTER HUB</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Talent Operations &amp; Call-Sheet Hub
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Manage invitations, shoot itineraries, production events, brand milestones, and contract reviews in one synchronized hub.
        </p>
      </div>

      {/* Action Buttons & Filter */}
      <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
        {/* Project Selector */}
        <select
          value={filterProject}
          onChange={(e) => onFilterProjectChange(e.target.value)}
          aria-label="Filter by Project"
          className="px-3.5 py-2.5 bg-white border border-purple-200 rounded-2xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-purple-400"
        >
          <option value="all">All Active Projects</option>
          {projectsList.map((proj) => (
            <option key={proj} value={proj}>
              {proj}
            </option>
          ))}
        </select>

        {/* Schedule Button */}
        <Button
          onClick={onOpenSchedule}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-4 py-2.5 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Itinerary / Event</span>
        </Button>
      </div>
    </div>
  );
};
