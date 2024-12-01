
"use client";

import BubbleChartContainer from "./BubbleChart"; // Ensure the correct path

export const BubbleCard = () => {
  return (
    <div
      className="card flex flex-col p-6 shadow-lg rounded-lg bg-white max-w-6xl mx-auto"
      style={{ minHeight: "600px" }}
    >
      <div className="card-header mb-4 text-center">
        <h2 className="text-2xl font-bold">Message Type Visualization</h2>
        <p className="text-sm text-gray-500">Interactive Bubble Chart Overview</p>
      </div>
      <div className="card-content flex-1 overflow-y-auto">
        <BubbleChartContainer />
      </div>
    </div>
  );
};
