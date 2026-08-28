import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
  badgeText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sublabel,
  icon: Icon,
  trend,
  trendPositive = true,
  className,
  badgeText,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100/80 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        {Icon && (
          <div className="p-2 rounded-xl bg-purple-50 border border-purple-100 text-purple-700">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {value}
          </span>
          {badgeText && (
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              {badgeText}
            </span>
          )}
        </div>

        {(sublabel || trend) && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {trend && (
              <span
                className={cn(
                  'font-bold',
                  trendPositive ? 'text-emerald-600' : 'text-rose-600'
                )}
              >
                {trend}
              </span>
            )}
            {sublabel && <span>{sublabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
