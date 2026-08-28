import React from 'react';
import { Bot, User } from 'lucide-react';
import { CopilotChatMessage } from '@/types';
import { CopilotInsightCard } from './CopilotInsightCard';

export interface CopilotMessageBubbleProps {
  message: CopilotChatMessage;
  onActionClick?: (actionType?: string, actionLabel?: string) => void;
}

export const CopilotMessageBubble: React.FC<CopilotMessageBubbleProps> = ({
  message,
  onActionClick,
}) => {
  const isAi = message.sender === 'ai';

  return (
    <div className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-2xs text-xs ${
          isAi
            ? 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white'
            : 'bg-slate-800 text-white'
        }`}
      >
        {isAi ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
          isAi
            ? 'bg-purple-50/70 border border-purple-100 text-slate-800 shadow-2xs'
            : 'bg-purple-600 text-white shadow-2xs font-medium'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>

        {/* Structured Insights Card */}
        {message.insights && (
          <CopilotInsightCard
            insights={message.insights}
            onActionClick={onActionClick}
          />
        )}

        <div
          className={`text-[10px] mt-1 text-right ${
            isAi ? 'text-slate-400' : 'text-purple-200'
          }`}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};
