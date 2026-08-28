'use client';

import React from 'react';
import { Sparkles, Clock, Check, X } from 'lucide-react';
import { WorkspaceInvitation } from '@/types';

export interface WorkspaceInvitationsListProps {
  invitations: WorkspaceInvitation[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const WorkspaceInvitationsList: React.FC<WorkspaceInvitationsListProps> = ({
  invitations,
  onAccept,
  onDecline,
}) => {
  if (invitations.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-purple-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Invitations &amp; Endorsement Offers
            </h3>
            <p className="text-xs text-slate-500">
              Incoming high-profile film conclaves, brand ambassadorships, and award galas
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-purple-900 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          {invitations.filter((i) => i.status === 'pending').length} Action Required
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invitations.map((inv) => {
          const isPending = inv.status === 'pending';
          const isAccepted = inv.status === 'accepted';
          const senderName = typeof inv.sender === 'object' && inv.sender?.name ? inv.sender.name : typeof inv.sender === 'string' ? inv.sender : 'Brand Partner';
          const senderRole = (typeof inv.sender === 'object' && inv.sender?.role) || 'Executive Partner';
          const senderAvatar = (typeof inv.sender === 'object' && inv.sender?.avatar) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';

          return (
            <div
              key={inv.id}
              className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between space-y-3 ${
                isAccepted
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : inv.status === 'declined'
                  ? 'bg-slate-50/50 border-slate-200 opacity-60'
                  : 'bg-white border-purple-100/90 hover:border-purple-300 shadow-2xs hover:shadow-md'
              }`}
            >
              {/* Transparent Relatable Background Image */}
              {inv.coverImage && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={inv.coverImage}
                    alt=""
                    className="w-full h-full object-cover object-center opacity-[0.12] group-hover:opacity-[0.18] group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
              )}

              {/* Sender & Project */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={senderAvatar}
                      alt={senderName}
                      className="w-8 h-8 rounded-full object-cover border border-purple-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {senderName}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {senderRole}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-purple-800 bg-purple-50/90 px-2 py-0.5 rounded-md border border-purple-100/80 shrink-0">
                    {inv.project || 'General'}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                    {inv.title || 'Exclusive Talent Opportunity'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {inv.description || 'Details regarding upcoming collaboration and commercial presence.'}
                  </p>
                </div>
              </div>

              {/* Timing & Actions */}
              <div className="relative z-10 pt-2 border-t border-purple-50/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <Clock className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                  <span>{inv.date || 'Today'} • {inv.time || '10:00 AM'}</span>
                </div>

                {/* Action Buttons */}
                {isPending ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onDecline(inv.id)}
                      className="p-1.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Decline Offer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onAccept(inv.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Accept</span>
                    </button>
                  </div>
                ) : (
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      isAccepted
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {isAccepted ? 'Accepted & Scheduled' : 'Declined'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
