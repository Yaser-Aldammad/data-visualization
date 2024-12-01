/* "use client";
import React from 'react';
import ReactFlow, { Controls, Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { processData } from './prepareData';

// Define a custom node component for better UX
const CustomNode = ({ data }: any) => (
  <div className="bg-blue-500 text-white rounded p-2 shadow-md">
    <strong>{data.label}</strong>
    {data.description && <p className="text-sm mt-1">{data.description}</p>}
  </div>
);

const createNodesAndEdges = (
  data: HierarchyNode,
  parentId: string = 'root',
  level = 0,
  maxDepth = 4,
  xSpacing = 500,
  ySpacing = 150,
  siblingIndex = 0,
  siblingCount = 1
): { nodes: Node[]; edges: Edge[] } => {
  if (level > maxDepth) return { nodes: [], edges: [] };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Dynamic y-position based on sibling index and count
  const yPosition = (siblingIndex - siblingCount / 2) * ySpacing + Math.random() * 20; // Add slight randomness to avoid perfect alignment

  nodes.push({
    id: parentId,
    type: 'custom',
    data: { label: data.name, description: data.description },
    position: { x: level * xSpacing, y: yPosition },
  });

  if (data.children) {
    data.children.forEach((child, index) => {
      const childId = `${parentId}-${index}`;
      edges.push({ id: `edge-${parentId}-${childId}`, source: parentId, target: childId });

      const childNodesAndEdges = createNodesAndEdges(
        child,
        childId,
        level + 1,
        maxDepth,
        xSpacing,
        ySpacing,
        index,
        data.children.length
      );

      nodes.push(...childNodesAndEdges.nodes);
      edges.push(...childNodesAndEdges.edges);
    });
  }

  return { nodes, edges };
};



export const ChartComponent: React.FC = () => {
  const { nodes, edges } = createNodesAndEdges(processData.hierarchyData, 'root', 0, 4, 300, 150); // Updated spacing

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}; */



/* "use client";
import React from 'react';
import ReactFlow, { Controls, Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { processData } from './prepareData';

// Define a custom node component for better UX
const CustomNode = ({ data }: any) => (
  <div className="bg-blue-500 text-white rounded p-2 shadow-md">
    <strong>{data.label}</strong>
    {data.description && <p className="text-sm mt-1">{data.description}</p>}
  </div>
);

const createNodesAndEdges = (
  data: HierarchyNode,
  parentId: string = 'root',
  level = 0,
  maxDepth = 4,
  xSpacing = 500,
  ySpacing = 150,
  siblingIndex = 0,
  siblingCount = 1
): { nodes: Node[]; edges: Edge[] } => {
  if (level > maxDepth) return { nodes: [], edges: [] };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Dynamic y-position based on sibling index and count
  const yPosition = (siblingIndex - siblingCount / 2) * ySpacing + Math.random() * 20;

  nodes.push({
    id: parentId,
    type: 'custom',
    data: { label: data.name, description: data.description },
    position: { x: level * xSpacing, y: yPosition },
  });

  if (data.children) {
    data.children.forEach((child, index) => {
      const childId = `${parentId}-${index}`;
      edges.push({ id: `edge-${parentId}-${childId}`, source: parentId, target: childId });

      const childNodesAndEdges = createNodesAndEdges(
        child,
        childId,
        level + 1,
        maxDepth,
        xSpacing,
        ySpacing,
        index,
        data.children.length
      );

      nodes.push(...childNodesAndEdges.nodes);
      edges.push(...childNodesAndEdges.edges);
    });
  }

  return { nodes, edges };
};

export const ChartComponent: React.FC = () => {
  const { nodes, edges } = createNodesAndEdges(processData.hierarchyData, 'root', 0, 4, 300, 150);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
 */

// SnakeyChartComponent.tsx

"use client";

import React, { useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Node,
  Edge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { processData, MessageData } from './prepareData';
import CardComponent from './Card'; // Fix this import

const SnakeyChart: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    const chartData: MessageData[] = processData();

    if (chartData.length === 0) {
      console.error("No data available for SnakeyChart.");
      return;
    }

    const newNodes: Node[] = chartData.map((item, index) => ({
      id: item.id,
      data: { label: `${item.message} (${item.type})` },
      position: { x: (index % 4) * 250, y: Math.floor(index / 4) * 100 },
      style: {
        border: `2px solid ${getColorByType(item.type)}`,
        backgroundColor: '#f0f0f0',
        padding: 10,
      },
    }));

    const newEdges: Edge[] = chartData.map((item, index) => ({
      id: `e-${index}`,
      source: findNodeId(item.encoder, chartData),
      target: findNodeId(item.decoder, chartData),
      type: 'smoothstep',
      animated: true,
      style: { stroke: getColorByType(item.type) },
    })).filter((edge) => edge.source && edge.target);

    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', gap: '20px' }}>
      <div style={{ width: '70%' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Controls />
          <Background variant="dots" />
        </ReactFlow>
      </div>
      <div style={{ width: '30%', overflowY: 'scroll' }}>
        {processData().map((data) => (
          <CardComponent
            key={data.id}
            data={data}
            onSelect={(id) => setSelectedNode(id)} // Set selected node
          />
        ))}
      </div>
    </div>
  );
};

// Wrap SnakeyChart in ReactFlowProvider to provide necessary context
export default function SnakeyChartComponent() {
  return (
    <ReactFlowProvider>
      <SnakeyChart />
    </ReactFlowProvider>
  );
}

const getColorByType = (type: string) => {
  const typeColors: Record<string, string> = {
    "Body Language": "blue",
    "Light Signals": "green",
    "Other Signals": "orange",
  };
  return typeColors[type] || "gray";
};

const findNodeId = (name: string, data: MessageData[]): string | null => {
  const found = data.find((item) => item.encoder === name || item.decoder === name);
  return found ? found.id : null;
};
