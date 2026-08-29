'use client';

import React, { useEffect } from 'react';
import { GraphNode, GraphEdge, NodeLevel, ProjectedGraphNode } from '@/types';

export interface GraphCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  nodesRef: React.RefObject<GraphNode[]>;
  edges: GraphEdge[];
  selectedNode?: GraphNode | null;
  setSelectedNode: (node: GraphNode | null) => void;
  hoveredNode: GraphNode | null;
  setHoveredNode: (node: GraphNode | null) => void;
  levelFilter: 'all' | NodeLevel;
  categoryFilter: string;
  searchQuery: string;
  zoomLevel: number;
  isAutoRotating: boolean;
  rotX: React.RefObject<number>;
  rotY: React.RefObject<number>;
  isDragging: React.RefObject<boolean>;
  lastMousePos: React.RefObject<{ x: number; y: number }>;
  adjacencyMap: Map<string, Set<string>>;
  onInitialRender?: () => void;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  canvasRef,
  nodesRef,
  edges,
  selectedNode,
  setSelectedNode,
  hoveredNode,
  setHoveredNode,
  levelFilter,
  categoryFilter,
  searchQuery,
  zoomLevel,
  isAutoRotating,
  rotX,
  rotY,
  isDragging,
  lastMousePos,
  adjacencyMap,
  onInitialRender,
}) => {
  const initialRenderFiredRef = React.useRef(false);
  // ── 3D CANVAS FORCE-DIRECTED GRAPH RENDERER ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.parentElement?.clientWidth || 900;
      const height = canvas.parentElement?.clientHeight || 650;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Auto-rotation in 3D
      if (isAutoRotating && !isDragging.current && rotY.current !== null) {
        rotY.current += 0.002;
      }

      // Clear dark obsidian canvas
      ctx.fillStyle = '#050711';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle obsidian coordinate grid
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.04)';
      ctx.lineWidth = 1;
      const gridStep = 45;
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const cx = width / 2;
      const cy = height / 2;
      const f = 600; // Focal distance

      const rx = rotX.current ?? 0.25;
      const ry = rotY.current ?? 0.35;

      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      // Project 3D nodes to 2D screen coordinates
      const nodes = nodesRef.current || [];
      const projectedNodes: ProjectedGraphNode[] = nodes.map((node) => {
        // Y-axis Yaw
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        // X-axis Pitch
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective scaling
        const scale = (f / (f + z2 + 350)) * zoomLevel;
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;
        const nodeRadius = node.radius ?? 8;
        const screenRadius = Math.max(3.5, nodeRadius * scale);

        // Filter conditions
        const matchesLevel = levelFilter === 'all' || node.level <= levelFilter;
        const matchesCategory =
          categoryFilter === 'all' || node.category === categoryFilter || node.level === 0;
        const searchLower = (searchQuery || '').toLowerCase();
        const matchesSearch =
          searchLower === '' ||
          (node.label || '').toLowerCase().includes(searchLower) ||
          (node.roleOrType || '').toLowerCase().includes(searchLower);
        const isDimmed = !matchesLevel || !matchesCategory || !matchesSearch;

        const isSelected = selectedNode ? selectedNode.id === node.id : false;
        const isHovered = hoveredNode?.id === node.id;
        const isConnectedToSelected = selectedNode
          ? (adjacencyMap.get(selectedNode.id)?.has(node.id) ?? false)
          : false;
        const isConnectedToHovered = hoveredNode
          ? adjacencyMap.get(hoveredNode.id)?.has(node.id) ?? false
          : false;

        return {
          ...node,
          color: node.color || '#a855f7',
          radius: nodeRadius,
          x1,
          y2,
          z2,
          scale,
          screenX,
          screenY,
          screenRadius,
          isDimmed,
          isSelected,
          isHovered,
          isConnected: isConnectedToSelected || isConnectedToHovered,
        };
      });

      // Sort by depth (back to front)
      projectedNodes.sort((a, b) => a.z2 - b.z2);
      const projectedMap = new Map<string, ProjectedGraphNode>();
      projectedNodes.forEach((pn) => projectedMap.set(pn.id, pn));

      // Draw Edges
      edges.forEach((edge) => {
        const source = projectedMap.get(edge.source);
        const target = projectedMap.get(edge.target);
        if (!source || !target) return;

        if (source.isDimmed && target.isDimmed) return;

        const isHighlighted =
          source.isSelected ||
          target.isSelected ||
          source.isHovered ||
          target.isHovered;

        let edgeAlpha = isHighlighted ? 0.9 : 0.22;
        if (source.isDimmed || target.isDimmed) edgeAlpha = 0.04;

        ctx.beginPath();
        ctx.moveTo(source.screenX, source.screenY);
        ctx.lineTo(target.screenX, target.screenY);

        if (edge.isLegal) {
          ctx.strokeStyle = `rgba(244, 63, 94, ${edgeAlpha})`;
          ctx.lineWidth = isHighlighted ? 2.2 : 1;
          ctx.setLineDash([4, 4]);
        } else if (edge.isHierarchy) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${edgeAlpha})`;
          ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = `rgba(148, 163, 184, ${edgeAlpha})`;
          ctx.lineWidth = isHighlighted ? 1.8 : 0.8;
          ctx.setLineDash([]);
        }

        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Edge Label if highlighted
        if (isHighlighted && !source.isDimmed && !target.isDimmed) {
          const midX = (source.screenX + target.screenX) / 2;
          const midY = (source.screenY + target.screenY) / 2;
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(216, 180, 254, 0.85)';
          ctx.textAlign = 'center';
          ctx.fillText(edge.label, midX, midY - 3);
        }
      });

      // Draw Nodes
      projectedNodes.forEach((node) => {
        if (node.isDimmed) {
          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, Math.max(2, node.screenRadius * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(71, 85, 105, 0.15)';
          ctx.fill();
          return;
        }

        // Selection / Hover Glow ring
        if (node.isSelected || node.isHovered) {
          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, node.screenRadius + 8, 0, Math.PI * 2);
          ctx.fillStyle = node.isSelected
            ? 'rgba(192, 132, 252, 0.3)'
            : 'rgba(255, 255, 255, 0.15)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, node.screenRadius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = node.isSelected ? '#c084fc' : '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Connected halo
        if (node.isConnected && !node.isSelected) {
          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, node.screenRadius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}90`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Main Node Body
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, node.screenRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Inner Core Ring
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, Math.max(1, node.screenRadius * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Node Label
        if (node.level <= 2 || node.isSelected || node.isHovered || node.isConnected) {
          ctx.font = `${node.level === 0 ? 'bold 13px' : node.level === 1 ? 'bold 11px' : '10px'} sans-serif`;
          ctx.textAlign = 'center';

          // Text shadow outline
          ctx.strokeStyle = '#050711';
          ctx.lineWidth = 3;
          ctx.strokeText(node.label, node.screenX, node.screenY + node.screenRadius + 14);

          ctx.fillStyle = node.isSelected
            ? '#f8fafc'
            : node.isConnected
            ? '#e2e8f0'
            : 'rgba(203, 213, 225, 0.9)';
          ctx.fillText(node.label, node.screenX, node.screenY + node.screenRadius + 14);
        }
      });

      // Notify parent that the 3D model has rendered its initial frame
      if (!initialRenderFiredRef.current && projectedNodes.length > 0) {
        initialRenderFiredRef.current = true;
        if (onInitialRender) {
          onInitialRender();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    canvasRef,
    nodesRef,
    edges,
    selectedNode,
    hoveredNode,
    levelFilter,
    categoryFilter,
    searchQuery,
    zoomLevel,
    isAutoRotating,
    rotX,
    rotY,
    isDragging,
    adjacencyMap,
  ]);

  // Mouse & Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      if (rotY.current !== null) rotY.current += dx * 0.006;
      if (rotX.current !== null) rotX.current += dy * 0.006;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Hover Detection
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const f = 600;

    const rx = rotX.current ?? 0.25;
    const ry = rotY.current ?? 0.35;
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);

    const nodes = nodesRef.current || [];
    let found: GraphNode | null = null;

    for (const node of nodes) {
      const x1 = node.x * cosY + node.z * sinY;
      const z1 = -node.x * sinY + node.z * cosY;
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;
      const scale = (f / (f + z2 + 350)) * zoomLevel;
      const screenX = cx + x1 * scale;
      const screenY = cy + y2 * scale;
      const screenRadius = Math.max(3.5, node.radius * scale);

      const dist = Math.hypot(mouseX - screenX, mouseY - screenY);
      if (dist <= screenRadius + 6) {
        found = node;
        break;
      }
    }

    setHoveredNode(found);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const f = 600;

    const rx = rotX.current ?? 0.25;
    const ry = rotY.current ?? 0.35;
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);

    const nodes = nodesRef.current || [];
    for (const node of nodes) {
      const x1 = node.x * cosY + node.z * sinY;
      const z1 = -node.x * sinY + node.z * cosY;
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;
      const scale = (f / (f + z2 + 350)) * zoomLevel;
      const screenX = cx + x1 * scale;
      const screenY = cy + y2 * scale;
      const screenRadius = Math.max(3.5, node.radius * scale);

      const dist = Math.hypot(mouseX - screenX, mouseY - screenY);
      if (dist <= screenRadius + 6) {
        setSelectedNode(node);
        break;
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl"
    />
  );
};
