import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { GraphNode, GraphEdge, NodeLevel } from '@/types';

interface UseGraph3DOptions {
  initialNodes: GraphNode[];
  initialEdges: GraphEdge[];
  defaultSelectedNodeId?: string;
}

export function useGraph3D({
  initialNodes,
  initialEdges,
  defaultSelectedNodeId = 'root-hrithik',
}: UseGraph3DOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(
    initialNodes.find((n) => n.id === defaultSelectedNodeId) || initialNodes[0] || null
  );
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [levelFilter, setLevelFilter] = useState<'all' | NodeLevel>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0.95);

  // 3D Camera Angles
  const rotX = useRef<number>(0.25);
  const rotY = useRef<number>(0.35);
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const nodesRef = useRef<GraphNode[]>(initialNodes);

  // Update nodesRef whenever initialNodes changes
  nodesRef.current = initialNodes;

  // Quick lookup maps
  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    initialNodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [initialNodes]);

  // Keep selected node valid
  useEffect(() => {
    const currentSelected = selectedNode?.id ? nodeMap.get(selectedNode.id) : null;
    if (currentSelected) {
      setSelectedNode(currentSelected);
    } else if (initialNodes.length > 0) {
      setSelectedNode(initialNodes.find((n) => n.id === defaultSelectedNodeId) || initialNodes[0]);
    }
  }, [nodeMap, initialNodes, defaultSelectedNodeId, selectedNode?.id]);

  // Adjacency lists for graph queries
  const { adjacencyMap, parentMap } = useMemo(() => {
    const adj = new Map<string, Set<string>>();
    const par = new Map<string, string>();

    initialNodes.forEach((n) => {
      adj.set(n.id, new Set());
      if (n.parentId) par.set(n.id, n.parentId);
    });

    initialEdges.forEach((e) => {
      adj.get(e.source)?.add(e.target);
      adj.get(e.target)?.add(e.source);
    });

    return { adjacencyMap: adj, parentMap: par };
  }, [initialNodes, initialEdges]);

  const selectNodeById = useCallback(
    (nodeId: string) => {
      const target = nodeMap.get(nodeId);
      if (target) setSelectedNode(target);
    },
    [nodeMap]
  );

  const resetCamera = useCallback(() => {
    rotX.current = 0.25;
    rotY.current = 0.35;
    setZoomLevel(0.95);
    setIsAutoRotating(false);
    selectNodeById(defaultSelectedNodeId);
  }, [defaultSelectedNodeId, selectNodeById]);

  return {
    canvasRef,
    selectedNode,
    setSelectedNode,
    hoveredNode,
    setHoveredNode,
    levelFilter,
    setLevelFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    isAutoRotating,
    setIsAutoRotating,
    zoomLevel,
    setZoomLevel,
    rotX,
    rotY,
    isDragging,
    lastMousePos,
    nodesRef,
    nodeMap,
    adjacencyMap,
    parentMap,
    selectNodeById,
    resetCamera,
  };
}
