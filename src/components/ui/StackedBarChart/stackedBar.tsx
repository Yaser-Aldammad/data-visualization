"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import processData from "../../../../data/processData";

// Define the type for chart data
interface ChartEntry {
  context: string;
  spatialColocated: number;
  spatialDistributed: number;
}

const ContextStackedBarChart: React.FC = () => {
  // Explicitly define the type for chartData as ChartEntry[]
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [totals, setTotals] = useState({
    spatialColocated: 0,
    spatialDistributed: 0,
    synchronous: 0,
    asynchronous: 0,
  });

  useEffect(() => {
    const data = processData.messages.reduce<ChartEntry[]>((acc, msg) => {
      const existingEntry = acc.find((item) => item.context === msg.temporalContext);
      if (existingEntry) {
        existingEntry.spatialColocated += msg.spatialContext === "Colocated" ? 1 : 0;
        existingEntry.spatialDistributed += msg.spatialContext === "Distributed" ? 1 : 0;
      } else {
        acc.push({
          context: msg.temporalContext,
          spatialColocated: msg.spatialContext === "Colocated" ? 1 : 0,
          spatialDistributed: msg.spatialContext === "Distributed" ? 1 : 0,
        });
      }
      return acc;
    }, []);

    // Calculate totals
    const totalColocated = data.reduce((sum, item) => sum + item.spatialColocated, 0);
    const totalDistributed = data.reduce((sum, item) => sum + item.spatialDistributed, 0);
    const totalSynchronous = data.reduce(
      (sum, item) => (item.context === "Synchronous" ? sum + item.spatialColocated + item.spatialDistributed : sum),
      0
    );
    const totalAsynchronous = data.reduce(
      (sum, item) => (item.context === "Asynchronous" ? sum + item.spatialColocated + item.spatialDistributed : sum),
      0
    );

    setChartData(data);
    setTotals({
      spatialColocated: totalColocated,
      spatialDistributed: totalDistributed,
      synchronous: totalSynchronous,
      asynchronous: totalAsynchronous,
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="context" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spatialColocated" stackId="a" fill="#8884d8" />
          <Bar dataKey="spatialDistributed" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold">Category Totals</h3>
        <p className="text-sm">
          <strong>Colocated:</strong> {totals.spatialColocated} | <strong>Distributed:</strong> {totals.spatialDistributed}
        </p>
        <p className="text-sm">
          <strong>Synchronous:</strong> {totals.synchronous} | <strong>Asynchronous:</strong> {totals.asynchronous}
        </p>
      </div>
    </div>
  );
};

export default ContextStackedBarChart;
