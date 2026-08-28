import React from 'react';

export const GraphLegend: React.FC = () => {
  const legendItems = [
    { label: 'Talent Anchor', color: '#c084fc' },
    { label: 'Films & Studios', color: '#60a5fa' },
    { label: 'Brand Ventures', color: '#34d399' },
    { label: 'VIP Events', color: '#fb923c' },
    { label: 'Legal Covenants', color: '#f43f5e' },
    { label: 'Creators / Co-Stars', color: '#facc15' },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-20 bg-slate-950/85 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center gap-3">
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
      <div className="text-[10px] text-slate-500 border-l border-slate-800 pl-2">
        Click node to inspect • Drag to rotate
      </div>
    </div>
  );
};
