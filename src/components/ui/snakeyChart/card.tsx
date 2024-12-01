"use client";

import React from 'react';
import { MessageData } from './processData';

interface CardProps {
  data: MessageData;
  onSelect?: (id: string) => void; // Optional interaction handler
}

const getColorByType = (type: string) => {
  const typeColors: Record<string, string> = {
    "Body Language": "blue",
    "Light Signals": "green",
    "Other Signals": "orange",
    "Unknown Type": "gray", // Default color for unknown types
  };
  return typeColors[type] || "gray";
};

export const CardComponent: React.FC<CardProps> = ({ data, onSelect }) => {
  const color = getColorByType(data.type);

  return (
    <div
      style={{
        border: `2px solid ${color}`,
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: onSelect ? 'pointer' : 'default',
      }}
      onClick={() => onSelect && onSelect(data.id)} // Handle click for selection
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
