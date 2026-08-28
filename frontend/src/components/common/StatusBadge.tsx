import React from 'react';
import { cn } from '@/lib/utils';

export interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'purple' | 'neutral';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'neutral',
  className,
}) => {
  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    error: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-blue-50 text-blue-700 border-blue-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variantStyles[variant],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};
