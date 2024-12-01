/* "use client";
import React from 'react';
import { ChartComponent } from './SnackeyChart';

export const CardComponent: React.FC = () => {
  return (
    <div className="shadow-lg rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Hierarchy Diagram</h2>
      <p className="text-gray-600 text-sm mb-2">
        Explore the hierarchy by interacting with the chart below.
      </p>
      <ChartComponent />
    </div>
  );
};
 */

/* "use client";
import React from 'react';
import { ChartComponent } from './SnackeyChart';

export const CardComponent: React.FC = () => {
  return (
    <div className="shadow-lg rounded-lg p-6 bg-white" style={{ height: '90vh', width: '100%' }}>
      <h2 className="text-xl font-semibold mb-4">Hierarchy Diagram</h2>
      <p className="text-gray-600 text-sm mb-4">
        Explore the hierarchy by interacting with the chart below.
      </p>
      <div className="flex-grow">
        <ChartComponent />
      </div>
    </div>
  );
}; */


// CardComponent.tsx
"use client";
import React from 'react';
import { MessageData } from './prepareData';

interface CardProps {
  data: MessageData;
  onSelect?: (id: string) => void;
}

const getColorByType = (type: string) => {
  const typeColors: Record<string, string> = {
    "Body Language": "blue",
    "Light Signals": "green",
    "Other Signals": "orange",
  };
  return typeColors[type] || "gray";
};

const CardComponent: React.FC<CardProps> = ({ data, onSelect }) => {
  const color = getColorByType(data.type);

  return (
    <div
      style={{
        border: `2px solid ${color}`,
        padding: '10px',
        margin: '10px',
        cursor: onSelect ? 'pointer' : 'default',
      }}
      onClick={() => onSelect && onSelect(data.id)}
    >
      <h3 style={{ color }}>{data.message}</h3>
      <p>
        <strong>Encoder:</strong> {data.encoder} <br />
        <strong>Decoder:</strong> {data.decoder} <br />
        <strong>Type:</strong> {data.type} <br />
        <strong>Categories:</strong> {data.categories} <br />
        <strong>Spatial Context:</strong> {data.spatialContext} <br />
        <strong>Temporal Context:</strong> {data.temporalContext}
      </p>
    </div>
  );
};

export default CardComponent; // Use default export
