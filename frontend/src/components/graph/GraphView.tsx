'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useGraph3D } from '@/hooks/useGraph3D';
import { GraphNode, GraphEdge } from '@/types';
import { graphService, SubgraphResponse } from '@/services/graphService';
import { GraphStatsHeader } from './GraphStatsHeader';
import { GraphSidebarFilters } from './GraphSidebarFilters';
import { GraphControls } from './GraphControls';
import { GraphLegend } from './GraphLegend';
import { GraphNodeDetailsDrawer } from './GraphNodeDetailsDrawer';
import { GraphCanvas } from './GraphCanvas';

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
          />

          {/* Bottom Legend Overlay */}
          <GraphLegend />
        </div>
      </div>
    </div>
  );
};

