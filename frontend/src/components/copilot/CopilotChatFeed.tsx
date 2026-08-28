import React from 'react';
import { CopilotChatMessage } from '@/types';
import { CopilotMessageBubble } from './CopilotMessageBubble';
import { LoadingThreeDotsJumping } from '@/components/ui/LoadingThreeDotsJumping';

export interface CopilotChatFeedProps {
  messages: CopilotChatMessage[];
  isTyping?: boolean;
  onActionClick?: (actionType?: string, actionLabel?: string) => void;
  chatBottomRef?: React.RefObject<HTMLDivElement | null>;
}

export const CopilotChatFeed: React.FC<CopilotChatFeedProps> = ({
  messages,
  isTyping = false,
  onActionClick,
  chatBottomRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[420px] scrollbar-thin scrollbar-thumb-purple-200">
      {messages.map((message) => (
        <CopilotMessageBubble
          key={message.id}
          message={message}
          onActionClick={onActionClick}
        />
      ))}

      {isTyping && (
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs shrink-0 shadow-2xs">
            ◈
          </div>
          <div className="bg-purple-50/80 border border-purple-100 rounded-2xl px-4 py-2.5">
            <LoadingThreeDotsJumping />
          </div>
        </div>
      )}

      <div ref={chatBottomRef} />
    </div>
  );
};
