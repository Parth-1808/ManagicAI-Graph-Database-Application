import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LayerCardProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export const LayerCard: React.FC<LayerCardProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-purple-200 p-6 sm:p-8 shadow-[0_8px_30px_rgba(168,85,247,0.04)] hover:border-purple-400 hover:shadow-[0_12px_40px_rgba(168,85,247,0.08)] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group text-slate-800',
        className
      )}
    >
      <div className="space-y-3 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold font-mono tracking-wide shadow-2xs">
            {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 text-purple-600" />}
            <span>{badge}</span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
