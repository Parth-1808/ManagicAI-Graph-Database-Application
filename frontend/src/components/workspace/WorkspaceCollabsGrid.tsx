'use client';

import React from 'react';
import { GitFork } from 'lucide-react';
import { WorkspaceCollab } from '@/types';

export interface WorkspaceCollabsGridProps {
  collabs: WorkspaceCollab[];
}

export const WorkspaceCollabsGrid: React.FC<WorkspaceCollabsGridProps> = ({
  collabs,
}) => {
  if (collabs.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-purple-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
            <GitFork className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Active Brand Collaborations &amp; Venture Progress
            </h3>
            <p className="text-xs text-slate-500">
              Campaign milestones, task completion rates, and production leads
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {collabs.length} Active Deals
        </span>
      </div>

      {/* Clean Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collabs.map((collab) => {
          const leadName = collab.lead?.name || 'Managing Lead';
          const leadAvatar = collab.lead?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
          const progressVal = collab.progress ?? 65;
          const completedTasksVal = collab.completedTasks ?? 3;
          const tasksCountVal = collab.tasksCount ?? 5;
          const statusStr = (collab.status || 'active').replace('_', ' ');

          return (
            <div
              key={collab.id}
              className="group relative overflow-hidden rounded-2xl border border-purple-100/90 bg-white p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3.5"
            >
              {/* Transparent Relatable Background Image Overlay */}
              {collab.coverImage && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={collab.coverImage}
                    alt=""
                    className="w-full h-full object-cover object-center opacity-[0.12] group-hover:opacity-[0.20] group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
              )}

              {/* Main Content */}
              <div className="relative z-10 space-y-2.5">
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-purple-800 bg-purple-50/90 px-2.5 py-0.5 rounded-md border border-purple-100/80 backdrop-blur-xs">
                    {collab.project || 'Brand Venture'}
                  </span>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${
                      collab.status === 'active'
                        ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
                        : collab.status === 'in_review'
                        ? 'bg-amber-50/90 text-amber-800 border-amber-200'
                        : 'bg-slate-50/90 text-slate-700 border-slate-200'
                    }`}
                  >
                    {statusStr}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug">
                    {collab.title || 'Brand Partnership'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {collab.description || 'Promotional campaign and brand endorsement deliverables.'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Milestone Progress</span>
                    <span className="text-purple-700 font-bold">
                      {progressVal}% ({completedTasksVal}/{tasksCountVal} Tasks)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100/90 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressVal}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 pt-2.5 border-t border-purple-50/90 flex items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leadAvatar}
                    alt={leadName}
                    className="w-6 h-6 rounded-full object-cover border border-purple-200 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
                    }}
                  />
                  <span className="truncate font-medium text-slate-700">{leadName}</span>
                </div>

                <span className="text-[11px] text-slate-400 shrink-0 truncate">
                  {collab.lastActivity || 'Active milestone'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
