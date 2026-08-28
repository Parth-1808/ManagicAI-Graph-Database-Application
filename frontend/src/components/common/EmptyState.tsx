import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-3xl border border-dashed border-purple-200/80 bg-white/50 backdrop-blur-xs p-10 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto',
        className
      )}
    >
      <div className="p-4 rounded-2xl bg-purple-100/60 text-purple-700">
        <Icon className="h-8 w-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold px-4 py-2 shadow-sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
