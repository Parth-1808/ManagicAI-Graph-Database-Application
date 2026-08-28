import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  badgeLabel?: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  actionNode?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badgeLabel,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  description,
  actionNode,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 sm:p-8 shadow-[0_12px_40px_rgba(168,85,247,0.06)] relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6',
        className
      )}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-2 relative z-10 max-w-3xl">
        {badgeLabel && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
            <BadgeIcon className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
            <span>{badgeLabel}</span>
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {actionNode && (
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          {actionNode}
        </div>
      )}
    </div>
  );
};
