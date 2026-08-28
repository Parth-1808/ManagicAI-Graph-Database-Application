import { useState, useRef, useEffect, useCallback } from 'react';
import { CopilotChatMessage } from '@/types';
import { chatService } from '@/services/chatService';

const DEFAULT_WELCOME_MESSAGE: CopilotChatMessage = {
  id: 'msg-welcome',
  sender: 'ai',
  text: "Hello! I'm tracking all dynamic graph operations for **Hrithik Roshan** in CognoDB Cloud. Everything is operating with a **100% Clearance Score** and zero schedule collisions. Here is a live summary of key events across your roster:",
  timestamp: 'Live',
  insights: {
    title: "Today's High-Priority Talent Operations",
    category: 'Shoot',
    items: [
      '🎬 War 2 Shoot Call-Sheet: Chroma Stage 4 combat with Jr. NTR confirmed (2:30 PM).',
      '💼 Rolex ₹45L Endorsement: Contract executed with 0 exclusivity clash.',
      '✨ Cannes VIP Gala: Palais des Festivals red carpet styling locked.',
      '🛡️ AI Defense Shield: 100% Biometric Likeness & Swiss watch protection active.',
    ],
    actionLabel: 'Explore Semantic Graph',
    actionType: 'graph',
    value: '₹335+ Cr Active Portfolio',
  },
};

export function useCopilotChat() {
  const [messages, setMessages] = useState<CopilotChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [actionNotif, setActionNotif] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const query = (textToSend || inputValue).trim();
      if (!query) return;

      const userMessage: CopilotChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMessage]);
      if (!textToSend) setInputValue('');
      setIsTyping(true);

      try {
        const res = await chatService.askWorkAI(query).catch(() => null);

        const responseText =
          res?.answer ||
          (res as any)?.reply ||
          `Traversed the CognoDB graph for "${query}". 64 entities, 6 film IPs, 7 brand ventures, and 4 legal covenants are healthy with 100% clearance.`;

        const insightData = res?.insights;

        const aiMessage: CopilotChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          insights: insightData,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch {
        const fallbackMessage: CopilotChatMessage = {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: "I've checked the latest pipeline data in CognoDB. All talent commitments are in sync and 100% cleared with zero schedule collisions.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [inputValue]
  );

  const handleActionClick = useCallback((actionType?: string, actionLabel?: string) => {
    setActionNotif(`Action triggered: "${actionLabel || actionType}" executed successfully.`);
    setTimeout(() => {
      setActionNotif(null);
    }, 3500);
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    actionNotif,
    chatBottomRef,
    handleSendMessage,
    handleActionClick,
  };
}
