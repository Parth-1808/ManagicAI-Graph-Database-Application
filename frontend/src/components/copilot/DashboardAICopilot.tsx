'use client';

import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2
} from 'lucide-react';
import { useCopilotChat } from '@/hooks/useCopilotChat';
import { CopilotChatFeed } from './CopilotChatFeed';
import { CopilotQuickPrompts } from './CopilotQuickPrompts';
import { CopilotActivityFeed } from './CopilotActivityFeed';

export interface DashboardAICopilotProps {
  showActivityFeed?: boolean;
  className?: string;
}

export const DashboardAICopilot: React.FC<DashboardAICopilotProps> = ({
  showActivityFeed = true,
  className,
}) => {
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    actionNotif,
    chatBottomRef,
    handleSendMessage,
    handleActionClick,
  } = useCopilotChat();

  return (
    <div
      className={`rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-5 sm:p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-4 relative overflow-hidden ${
        className || ''
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-purple-50 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Talent Decision Copilot
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Autonomous schedule defense &amp; contract negotiation agent
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-900 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          <span>Sub-15ms AI Shield</span>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotif && (
        <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in-0 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{actionNotif}</span>
        </div>
      )}

      {/* Main Two-Column or Stacked View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start relative z-10">
        {/* Chat Feed Column */}
        <div className={`flex flex-col space-y-3 ${showActivityFeed ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'}`}>
          <div className="bg-slate-50/70 rounded-2xl border border-purple-50 flex flex-col">
            <CopilotChatFeed
              messages={messages}
              isTyping={isTyping}
              onActionClick={handleActionClick}
              chatBottomRef={chatBottomRef}
            />

            {/* Quick Prompts Carousel */}
            <div className="p-3 border-t border-purple-50/80 bg-white/50">
              <CopilotQuickPrompts
                onSelectPrompt={(prompt) => handleSendMessage(prompt)}
                disabled={isTyping}
              />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-purple-100/80 bg-white rounded-b-2xl flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Copilot about shoots, brand deals, Cannes gala, or schedule conflicts..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="h-10 w-10 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-xs shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Live Operations Feed Column */}
        {showActivityFeed && (
          <div className="lg:col-span-5 xl:col-span-4 bg-slate-50/60 rounded-2xl border border-purple-50 p-3.5">
            <CopilotActivityFeed
              onSelectActivity={(prompt) => handleSendMessage(prompt)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
