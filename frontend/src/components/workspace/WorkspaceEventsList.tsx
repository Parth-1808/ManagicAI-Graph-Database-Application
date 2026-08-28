'use client';

import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { WorkspaceEventItem } from '@/types';

export interface WorkspaceEventsListProps {
  events: WorkspaceEventItem[];
  onToggleRSVP: (id: string) => void;
}

export const WorkspaceEventsList: React.FC<WorkspaceEventsListProps> = ({
  events,
  onToggleRSVP,
}) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-purple-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Live Shoot Itineraries &amp; Pre-Viz Milestones
            </h3>
            <p className="text-xs text-slate-500">
              Chroma stage call sheets, flight coordination, and stunt rehearsals
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {events.length} Upcoming
        </span>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((evt) => {
          const hostName = evt.host?.name || 'Production Desk';
          const hostAvatar = evt.host?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
          const isRSVPed = evt.isRSVPed ?? true;

          return (
            <div
              key={evt.id}
              className="group relative overflow-hidden rounded-2xl border border-purple-100/90 bg-white p-4.5 transition-all duration-300 hover:border-purple-300 shadow-2xs hover:shadow-md flex flex-col justify-between space-y-3.5"
            >
              {/* Transparent Relatable Background Image Overlay */}
              {evt.coverImage && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={evt.coverImage}
                    alt=""
                    className="w-full h-full object-cover object-center opacity-[0.12] group-hover:opacity-[0.18] group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
              )}

              {/* Header & Badges */}
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100/90 text-purple-900 border border-purple-200 backdrop-blur-xs">
                    {evt.dayBadge || 'UPCOMING'}
                  </span>

                  <span className="text-[10px] font-bold text-slate-600 bg-slate-50/90 px-2 py-0.5 rounded-md border border-slate-200/80">
                    {evt.project || 'Production'}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                    {evt.title || 'Production Milestone'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {evt.description || 'Schedule call-sheet and coordination itinerary.'}
                  </p>
                </div>

                {/* Time & Location */}
                <div className="space-y-1 text-xs text-slate-600 bg-slate-50/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{evt.time || '10:00 AM'} ({evt.date || 'August 2026'})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{evt.location || 'Mumbai / YRF Studios'}</span>
                  </div>
                </div>
              </div>

              {/* Host & RSVP Button */}
              <div className="relative z-10 pt-2.5 border-t border-purple-50/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hostAvatar}
                    alt={hostName}
                    className="w-6 h-6 rounded-full object-cover border border-purple-200 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                    }}
                  />
                  <span className="text-[11px] text-slate-700 truncate font-medium">
                    {hostName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleRSVP(evt.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isRSVPed
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-900 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className={`h-3.5 w-3.5 ${isRSVPed ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{isRSVPed ? 'RSVP Confirmed' : 'Confirm RSVP'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
