import React from 'react';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw 
} from 'lucide-react';

export interface GraphControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  onResetCamera: () => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  isAutoRotating,
  onToggleAutoRotate,
  onResetCamera,
}) => {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-xl">
      {/* Zoom Out */}
      <button
        type="button"
        title="Zoom Out"
        onClick={onZoomOut}
        className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <ZoomOut className="h-4 w-4" />
      </button>

      {/* Zoom Level Indicator */}
      <div className="px-2 text-[11px] font-mono font-bold text-purple-300 select-none">
        {Math.round(zoomLevel * 100)}%
      </div>

      {/* Zoom In */}
      <button
        type="button"
        title="Zoom In"
        onClick={onZoomIn}
        className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <ZoomIn className="h-4 w-4" />
      </button>

      <div className="h-4 w-px bg-slate-700 mx-0.5" />

      {/* Auto Rotate */}
      <button
        type="button"
        title={isAutoRotating ? 'Pause 3D Rotation' : 'Auto 3D Orbit'}
        onClick={onToggleAutoRotate}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          isAutoRotating
            ? 'bg-purple-600 text-white shadow-xs'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <RotateCw className={`h-3.5 w-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
        <span>Orbit</span>
      </button>

      {/* Reset Camera */}
      <button
        type="button"
        title="Reset 3D Perspective"
        onClick={onResetCamera}
        className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  );
};
