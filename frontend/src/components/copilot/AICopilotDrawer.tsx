'use client';

import React from 'react';
import { X, Bot } from 'lucide-react';
import { DashboardAICopilot } from './DashboardAICopilot';

export interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in-0"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-gradient-to-b from-[#fbf8fe] to-[#f4eafc] shadow-2xl p-4 sm:p-6 overflow-y-auto flex flex-col justify-between border-l border-purple-200 animate-in slide-in-from-right duration-300">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-purple-200/60 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Global Talent Copilot
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time negotiation, conflict mitigation &amp; schedule assistant
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-purple-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Copilot Component */}
          <div className="flex-1">
            <DashboardAICopilot showActivityFeed={false} />
          </div>

        </div>
      </div>
    </div>
  );
};
