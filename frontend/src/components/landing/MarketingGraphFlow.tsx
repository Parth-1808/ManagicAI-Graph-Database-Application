'use client';

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  MarkerType,
  Handle,
  Position,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Sparkles, 
  Zap, 
  Users, 
  Share2, 
  CheckCircle2, 
  RefreshCw,
  Cpu,
  Target,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CustomNodeData {
  label: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor?: string;
  iconColor?: string;
  metricLabel?: string;
  metricValue?: string;
  active?: boolean;
  [key: string]: unknown;
}

// Custom Node Component for Marketing Pipeline
const CustomMarketingNode = ({ data }: NodeProps<Node<CustomNodeData>>) => {
  const IconComponent = data.icon;
  return (
    <div className={`p-4 rounded-xl border ${data.active ? 'border-orange-500 shadow-lg shadow-orange-500/20 bg-slate-900' : 'border-slate-800 bg-slate-950/90'} transition-all duration-300 min-w-[210px]`}>
      <Handle type="target" position={Position.Top} className="!bg-orange-500 !w-2.5 !h-2.5" />
      <div className="flex items-center gap-3 mb-2">
        <div className={`h-8 w-8 rounded-lg ${data.bgColor || 'bg-orange-500/10'} flex items-center justify-center ${data.iconColor || 'text-orange-400'}`}>
          {IconComponent && <IconComponent className="h-4 w-4" />}
        </div>
        <div>
          <div className="text-xs font-bold text-white tracking-tight">{data.label}</div>
          <div className="text-[10px] text-slate-400 font-medium">{data.role}</div>
        </div>
      </div>
      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 mt-2">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-400">{data.metricLabel || 'Status'}:</span>
          <span className="font-semibold text-orange-400">{data.metricValue || 'Optimized'}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-orange-500 !w-2.5 !h-2.5" />
    </div>
  );
};

const nodeTypes = {
  marketingNode: CustomMarketingNode,
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'marketingNode',
    position: { x: 300, y: 20 },
    data: {
      label: 'Audience & Ingestion',
      role: 'Shopify, Meta Pixel, WhatsApp Data',
      icon: Users,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      metricLabel: 'Profiles Mapped',
      metricValue: '142,500 Users',
      active: true,
    },
  },
  {
    id: '2',
    type: 'marketingNode',
    position: { x: 100, y: 160 },
    data: {
      label: 'Hinglish Creative Engine',
      role: 'GenAI Multi-lingual Copy & Video',
      icon: Sparkles,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      metricLabel: 'Creatives Generated',
      metricValue: '48 Variants',
      active: true,
    },
  },
  {
    id: '3',
    type: 'marketingNode',
    position: { x: 500, y: 160 },
    data: {
      label: 'Regional Segmenter',
      role: 'Tier 1/2/3 Cultural Cohorts',
      icon: Target,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      metricLabel: 'Target Segments',
      metricValue: '12 Regions',
      active: true,
    },
  },
  {
    id: '4',
    type: 'marketingNode',
    position: { x: 100, y: 310 },
    data: {
      label: 'Omnichannel Dispatcher',
      role: 'Meta, Google PMax, WhatsApp',
      icon: Share2,
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      metricLabel: 'Active Campaigns',
      metricValue: '18 Live Ads',
      active: true,
    },
  },
  {
    id: '5',
    type: 'marketingNode',
    position: { x: 500, y: 310 },
    data: {
      label: 'Attribution Knowledge Graph',
      role: '1st Party Identity Resolution',
      icon: Cpu,
      bgColor: 'bg-rose-500/10',
      iconColor: 'text-rose-400',
      metricLabel: 'Attribution Match',
      metricValue: '99.4% Accurate',
      active: true,
    },
  },
  {
    id: '6',
    type: 'marketingNode',
    position: { x: 300, y: 460 },
    data: {
      label: 'Autonomous ROAS Rebalancer',
      role: 'Sub-Minute Budget Reallocation',
      icon: Zap,
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      metricLabel: 'Current ROAS Lift',
      metricValue: '4.82x (+142%)',
      active: true,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
  },
];

export const MarketingGraphFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<CustomNodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(initialNodes[5]);
  const [optimizationCount, setOptimizationCount] = useState(1);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (_: React.MouseEvent, node: Node<CustomNodeData>) => {
    setSelectedNode(node);
  };

  const triggerAutoOptimization = () => {
    setIsOptimizing(true);
    setOptimizationCount((prev) => prev + 1);

    setTimeout(() => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === '6') {
            return {
              ...node,
              data: {
                ...node.data,
                metricValue: `5.${1 + optimizationCount}x (+${150 + optimizationCount * 12}%)`,
              },
            };
          }
          return node;
        })
      );
      setIsOptimizing(false);
    }, 1200);
  };

  return (
    <section id="marketing-graph" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
              <Bot className="h-3.5 w-3.5" />
              Autonomous Marketing Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Marketing Graph Engine
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              See how Cowork AI connects every touchpoint: from ad copy synthesis in 12 languages to sub-second budget rebalancing on Meta & Google.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Button
              onClick={triggerAutoOptimization}
              disabled={isOptimizing}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Reallocating Ad Budgets...
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 mr-2" />
                  ⚡ Run Auto-Optimizer
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Graph Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* React Flow Viewport */}
          <div className="lg:col-span-2 h-[560px] rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden relative shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Live Knowledge Graph • Drag & Inspect Nodes
            </div>

            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onNodeClick={handleNodeClick}
              fitView
              attributionPosition="bottom-left"
            >
              <Background color="#334155" gap={20} size={1} variant={BackgroundVariant.Dots} />
              <Controls className="!bg-slate-900 !border-slate-800 !text-slate-300" />
            </ReactFlow>
          </div>

          {/* Node Inspector Sidebar */}
          <div className="flex flex-col gap-4">
            <Card className="bg-slate-900/80 border-slate-800 shadow-xl flex-1 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400 bg-orange-500/10 text-xs">
                    Node Inspector
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">ID: {selectedNode?.id || '6'}</span>
                </div>
                <CardTitle className="text-lg font-bold text-white mt-2">
                  {selectedNode?.data?.label || 'Autonomous ROAS Rebalancer'}
                </CardTitle>
                <p className="text-xs text-slate-400">{selectedNode?.data?.role}</p>
              </CardHeader>

              <CardContent className="space-y-4 text-xs text-slate-300">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Execution Frequency:</span>
                    <span className="font-semibold text-emerald-400">Every 45 Seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Health:</span>
                    <span className="font-semibold text-white">99.98% Healthy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Metric:</span>
                    <span className="font-bold text-orange-400">{selectedNode?.data?.metricValue}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    Autonomous Actions
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2 text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Shifts budget from &lt; 2.0x ad sets to top 10% performers</span>
                    </div>
                    <div className="flex items-start gap-2 text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Auto-generates regional Hinglish captions during high-traffic hours</span>
                    </div>
                    <div className="flex items-start gap-2 text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Triggers WhatsApp broadcast for abandoned UPI checkouts</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs mt-2 border border-slate-700"
                  onClick={() => alert(`Simulating granular inspection for node: ${selectedNode?.data?.label}`)}
                >
                  View Full Node Telemetry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
