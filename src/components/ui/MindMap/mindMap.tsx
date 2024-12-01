/* "use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { ReactFlowProvider, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import processData from "../../../../data/processData";

const ReactFlow = dynamic(() => import('reactflow'), { ssr: false });

const transformDataToMindMap = () => {
  const nodes = processData.messages.map((message, index) => ({
    id: message.id,
    data: { label: `${message.message} (${message.type})` },
    position: { x: Math.random() * 300, y: index * 100 },
  }));

  const edges = processData.messages.flatMap((message) =>
    message.categories.map((category) => ({
      id: `${message.id}-${category}`,
      source: message.id,
      target: category,
    }))
  );

  return { nodes, edges };
};

export const MindMapChart = () => {
  const { nodes, edges } = transformDataToMindMap();

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
 */
"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ReactFlowProvider, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import processData from "../../../../data/processData";
import { Tooltip } from 'react-tooltip'; // Tooltip for better UX

const ReactFlow = dynamic(() => import('reactflow'), { ssr: false });

// Helper function to assign colors to categories
const getColorByCategory = (category) => {
  const categoryColors = {
    CO: '#FF6F61',
    NP: '#6B8E23',
    SE: '#4682B4',
    default: '#A9A9A9',
  };
  return categoryColors[category] || categoryColors['default'];
};

const transformDataToMindMap = () => {
  const categories = [...new Set(processData.messages.flatMap(msg => msg.categories))];

  let currentY = 0;
  const nodes = [];
  const edges = [];

  categories.forEach((category, groupIndex) => {
    const categoryMessages = processData.messages
      .filter((message) => message.categories.includes(category))
      .sort((a, b) => a.message.localeCompare(b.message)); // Sort alphabetically by message

    categoryMessages.forEach((message, index) => {
      nodes.push({
        id: message.id,
        data: {
          label: `${message.message} (${message.type})`,
          description: message.description || 'No description',
        },
        position: {
          x: groupIndex * 350,
          y: currentY + index * 100,
        },
        style: {
          background: `linear-gradient(135deg, ${getColorByCategory(category)}, #ffffff)`,
          color: '#fff',
          padding: '10px',
          borderRadius: '12px',
          fontWeight: 'bold',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        },
      });

      edges.push(
        ...message.categories.map((cat) => ({
          id: `${message.id}-${cat}`,
          source: message.id,
          target: category,
          label: `Relation: ${cat}`,
          animated: true,
          style: { stroke: getColorByCategory(category), strokeWidth: 2 },
          labelStyle: { fill: '#555', fontSize: '12px', fontWeight: 'bold' },
        }))
      );
    });

    currentY += categoryMessages.length * 120; // Update Y-position after grouping
  });

  return { nodes, edges };
};

export const MindMapChart = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { nodes, edges } = transformDataToMindMap();

  const filteredNodes = nodes.filter((node) =>
    node.data.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNodeClick = (event, node) => {
    alert(`Node Details:\n${node.data.label}\n${node.data.description}`);
  };

  return (
    <div style={{ height: '700px', width: '100%' }}>
      <ReactFlowProvider>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginBottom: '10px',
            }}
          />
        </div>
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          fitView
          onNodeClick={handleNodeClick}
          style={{ backgroundColor: '#f4f4f8' }}
        >
          <Tooltip id="node-tooltip" />
          <Controls showInteractive={true} />
          <Background variant="dots" gap={20} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
