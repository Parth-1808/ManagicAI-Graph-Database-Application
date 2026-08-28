import React, { useEffect } from 'react';
import { Film, Briefcase, Sparkles, ShieldCheck, UserCheck } from 'lucide-react';
import { CopilotActivityItem } from '@/types';
import { useWorkStore } from '@/store/useWorkStore';

export interface CopilotActivityFeedProps {
  onSelectActivity: (prompt: string) => void;
}

export const CopilotActivityFeed: React.FC<CopilotActivityFeedProps> = ({
  onSelectActivity,
}) => {
  const { activities, fetchActivities } = useWorkStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const getIcon = (type: CopilotActivityItem['type']) => {
    switch (type) {
      case 'shoot':
        return <Film className="h-3.5 w-3.5 text-blue-600" />;
      case 'deal':
        return <Briefcase className="h-3.5 w-3.5 text-emerald-600" />;
      case 'gala':
        return <Sparkles className="h-3.5 w-3.5 text-purple-600" />;
      case 'conflict':
        return <ShieldCheck className="h-3.5 w-3.5 text-rose-600" />;
      case 'director':
        return <UserCheck className="h-3.5 w-3.5 text-amber-600" />;
      default:
        return <Sparkles className="h-3.5 w-3.5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
        <span>Live Talent Operations Stream</span>
        <span className="text-[10px] text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
          CognoDB Live
        </span>
      </div>

      <div className="space-y-1.5">
        {activities.map((activity: any) => (
          <button
            key={activity.id}
            type="button"
            onClick={() => onSelectActivity(activity.queryPrompt)}
            className="w-full text-left p-2.5 rounded-xl bg-white/80 hover:bg-purple-50/80 border border-purple-100 hover:border-purple-200 transition-all flex items-start gap-2.5 group shadow-2xs"
          >
            <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white border border-slate-100 shrink-0 mt-0.5">
              {getIcon(activity.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-purple-900">
                  {activity.title}
                </h4>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {activity.timeAgo}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {activity.detail}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
