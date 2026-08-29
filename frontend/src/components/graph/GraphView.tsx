'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGraph3D } from '@/hooks/useGraph3D';
import { GraphNode, GraphEdge } from '@/types';
import { graphService, SubgraphResponse } from '@/services/graphService';
import { GraphStatsHeader } from './GraphStatsHeader';
import { GraphSidebarFilters } from './GraphSidebarFilters';
import { GraphControls } from './GraphControls';
import { GraphLegend } from './GraphLegend';
import { GraphNodeDetailsDrawer } from './GraphNodeDetailsDrawer';
import { GraphCanvas } from './GraphCanvas';
import { GraphLoadingPreset } from './GraphLoadingPreset';

export interface GraphCategoryOption {
  id: string;
  label: string;
  count: number;
}

export const GraphView: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [categories, setCategories] = useState<GraphCategoryOption[]>([]);
  const [portfolioValuation, setPortfolioValuation] = useState<string>('₹335+ Cr Active Portfolio');
  const [isLiveDb, setIsLiveDb] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Model loading and rendering lifecycle
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isCanvasRendered, setIsCanvasRendered] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(12);

  const fetchLiveGraph = useCallback(async (showLoader = false) => {
    if (showLoader) setIsRefreshing(true);
    try {
      const res: SubgraphResponse = await graphService.getSubgraph();
      if (res && res.nodes3d && res.nodes3d.length > 0) {
        setNodes(res.nodes3d);
        setEdges(res.edges3d || []);
        if (res.categories && res.categories.length > 0) {
          setCategories(res.categories);
        }
        if (res.portfolioValuation) {
          setPortfolioValuation(res.portfolioValuation);
        }
        setIsLiveDb(Boolean(res.isLiveDb));
      }
    } catch (err) {
      console.warn('[GraphView] Error fetching live graph from CognoDB Cloud:', err);
    } finally {
      if (showLoader) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveGraph();
    // Live background polling every 12s to catch new items created across workspace
    const interval = setInterval(() => {
      fetchLiveGraph(false);
    }, 12000);
    return () => clearInterval(interval);
  }, [fetchLiveGraph]);

  // Smooth telemetry progression until the full 3D model renders
  useEffect(() => {
    if (!isInitialLoading) return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (nodes.length === 0) {
          // Progressing while fetching from CognoDB Cloud
          return Math.min(prev + (prev < 30 ? 5 : 2), 65);
        }
        if (!isCanvasRendered) {
          // Data ready, canvas calculating 3D projection & initial render
          return Math.min(prev + 4, 88);
        }
        // Both live graph data & canvas initial frame rendered! Finish smoothly to 100%
        if (prev < 100) {
          const next = prev + 12;
          if (next >= 100) {
            setTimeout(() => {
              setIsInitialLoading(false);
            }, 350);
            return 100;
          }
          return next;
        }
        return 100;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isInitialLoading, nodes.length, isCanvasRendered]);

  const handleCanvasInitialRender = useCallback(() => {
    setIsCanvasRendered(true);
  }, []);

  const {
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
    selectNodeById,
    resetCamera,
  } = useGraph3D({
    initialNodes: nodes,
    initialEdges: edges,
    defaultSelectedNodeId: 'root-hrithik',
  });

  const connectedNodeIds = React.useMemo(() => {
    if (!selectedNode?.id) return [];
    const set = adjacencyMap.get(selectedNode.id);
    return set ? Array.from(set) : [];
  }, [adjacencyMap, selectedNode?.id]);

  return (
    <div className="space-y-6 relative">
      {/* Top Stats & Search Header */}
      <GraphStatsHeader
        totalNodes={nodes.length}
        totalEdges={edges.length}
        portfolioValuation={portfolioValuation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLiveDb={isLiveDb}
        onRefresh={() => fetchLiveGraph(true)}
        isRefreshing={isRefreshing}
      />

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Control Filters & Legend Column */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col space-y-4">
          <GraphSidebarFilters
            levelFilter={levelFilter}
            onLevelFilterChange={setLevelFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            categories={categories}
          />

          <GraphNodeDetailsDrawer
            node={selectedNode}
            onSelectNodeById={selectNodeById}
            connectedNodeIds={connectedNodeIds}
            nodeMap={nodeMap}
          />
        </div>

        {/* Right 3D Canvas Viewport Column */}
        <div className="lg:col-span-8 xl:col-span-9 rounded-3xl overflow-hidden bg-[#050711] border border-slate-800 shadow-2xl relative h-[650px] sm:h-[720px]">
          {/* Special 3D Graph Loading Preset Overlay */}
          <AnimatePresence>
            {isInitialLoading && (
              <GraphLoadingPreset
                progress={loadingProgress}
                totalNodes={nodes.length || 64}
                totalEdges={edges.length || 114}
              />
            )}
          </AnimatePresence>

          {/* Top Controls Overlay */}
          <GraphControls
            zoomLevel={zoomLevel}
            onZoomIn={() => setZoomLevel((z) => Math.min(2.0, z + 0.15))}
            onZoomOut={() => setZoomLevel((z) => Math.max(0.4, z - 0.15))}
            isAutoRotating={isAutoRotating}
            onToggleAutoRotate={() => setIsAutoRotating((r) => !r)}
            onResetCamera={resetCamera}
          />

          {/* 3D Force-Directed Canvas */}
          <GraphCanvas
            canvasRef={canvasRef}
            nodesRef={nodesRef}
            edges={edges}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            levelFilter={levelFilter}
            categoryFilter={categoryFilter}
            searchQuery={searchQuery}
            zoomLevel={zoomLevel}
            isAutoRotating={isAutoRotating}
            rotX={rotX}
            rotY={rotY}
            isDragging={isDragging}
            lastMousePos={lastMousePos}
            adjacencyMap={adjacencyMap}
            onInitialRender={handleCanvasInitialRender}
          />

          {/* Bottom Legend Overlay */}
          <GraphLegend />
        </div>
      </div>
    </div>
  );
};

