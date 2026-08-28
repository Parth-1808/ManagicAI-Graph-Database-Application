import React from 'react';

export const SUGGESTION_CHIPS = [
  '🎬 Give me War 2 climax shoot call-sheet',
  '💼 Summarize Rolex ₹45L contract terms',
  '✨ What is the Cannes VIP Gala schedule?',
  '🛡️ Run AI Exclusivity Collision Radar',
  '📈 Show my active portfolio valuation',
];

export interface CopilotQuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export const CopilotQuickPrompts: React.FC<CopilotQuickPromptsProps> = ({
  onSelectPrompt,
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {SUGGESTION_CHIPS.map((chip, idx) => (
        <button
          key={idx}
          type="button"
          disabled={disabled}
          onClick={() => onSelectPrompt(chip)}
          className="whitespace-nowrap px-3 py-1 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200/80 text-purple-900 text-xs font-semibold transition-all shrink-0 hover:scale-102 active:scale-98 disabled:opacity-50"
        >
          {chip}
        </button>
      ))}
    </div>
  );
};
