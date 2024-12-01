/* "use client";

import React from 'react';
import { MindMapChart } from './mindMap'; // Adjust path accordingly

export const MindMapCard = () => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Mind Map Visualization</h2>
      <MindMapChart />
    </div>
  );
};
 */

"use client";

import React from 'react';
import { MindMapChart } from './mindMap'; // Ensure correct path

export const MindMapCard = () => {
  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        marginBottom: '20px',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Mind Map Visualization
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', textAlign: 'center' }}>
        Explore the relationships between messages, types, and categories interactively.
      </p>
      <MindMapChart />
    </div>
  );
};
