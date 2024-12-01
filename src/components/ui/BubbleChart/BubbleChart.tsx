
"use client";

import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Scatter,
} from "recharts";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/TableChart/table";
import { useEffect, useState } from "react";
import processData from "../../../../data/processData"; // Adjust path as needed

interface BubbleChartData {
  category: string;
  value: number;
  size: number;
}

const BubbleChartContainer: React.FC = () => {
  const [bubbleData, setBubbleData] = useState<BubbleChartData[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const data = processData.categorizedByType.map((item) => ({
      category: item.category,
      value: Math.log10(item.value + 1), // Log scale for better spread
      size: item.value,
    }));
    setBubbleData(data);
  }, []);

  const handleMouseEnter = (category: string) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Message Type Bubble Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="category" name="Message Type" />
          <YAxis dataKey="value" name="Log Count" />
<Tooltip
  cursor={{ strokeDasharray: "6 6" }}
  formatter={(value: number, name: string) => {
    if (name === "Log Count") {
      return [value.toFixed(2), "Log Count"]; // Limit to 2 decimal places
    }
    return [value, name];
  }}
/>          <Legend />
          <Scatter
            name="Message Types"
            data={bubbleData}
            fill="#8884d8"
             line={{ stroke: "#82ca9d", strokeWidth: 2 }}
            dataKey="size"
      onMouseEnter={(data) => setHoveredCategory(data.category)}
      onMouseLeave={() => setHoveredCategory(null)}
          >
  {bubbleData.map((entry) => (
        <circle
          key={entry.category}
          cx={entry.category}
          cy={entry.value}
          r={hoveredCategory === entry.category ? entry.size * 1.5 : entry.size}
          fill={hoveredCategory === entry.category ? "#ff7300" : "#8884d8"}
          style={{
            transition: "r 0.2s ease-in-out",
            stroke: hoveredCategory === entry.category ? "#ff7300" : "none",
            strokeWidth: hoveredCategory === entry.category ? 2 : 1,
          }}
        />
      ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Interactive Table */}
      <h2 className="mt-8 text-lg font-semibold">Message Type Counts</h2>
      <Table className="mt-4 w-full border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="border px-4 py-2">Message Type</TableHead>
            <TableHead className="border px-4 py-2">Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bubbleData.map((item) => (
            <TableRow
              key={item.category}
              className={`${hoveredCategory === item.category ? "bg-gray-200" : ""}`}
              onMouseEnter={() => handleMouseEnter(item.category)}
              onMouseLeave={handleMouseLeave}
            >
              <TableCell className="border px-4 py-2">{item.category}</TableCell>
              <TableCell className="border px-4 py-2">{item.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BubbleChartContainer;
