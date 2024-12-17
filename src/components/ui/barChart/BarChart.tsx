'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import processData from '../../../../data/processData'; // Adjust path as needed

const EncoderDecoderBarChart: React.FC = () => {
  const chartData = processData.processEncoderDecoderData();

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 500 }}>
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

      {/* Table Section */}
      <div style={{ marginTop: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Encoder</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Decoder</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((data, index) => (
              <tr key={index} style={{ textAlign: 'left' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.encoder}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.decoder}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EncoderDecoderBarChart;
