
'use client';

// components/EncoderDecoderBarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import processData from "../../../../data/processData"; // Adjust path as needed

const EncoderDecoderBarChart: React.FC = () => {
  const chartData = processData.processEncoderDecoderData();

  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="encoder" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Decoder Count" stackId="a" fill="#8884d8" />
          <Bar dataKey="count" name="Encoder Count" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EncoderDecoderBarChart;
