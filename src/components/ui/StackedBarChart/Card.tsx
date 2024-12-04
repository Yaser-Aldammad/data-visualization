"use client";

import React from "react";
import ContextStackedBarChart from "./stackedBar"; // Ensure the path is correct

const ContextStackedBarCard: React.FC = () => {
  return (
    <div className="card flex flex-col p-6 shadow-lg rounded-lg bg-white max-w-5xl mx-auto">
      <div className="card-header mb-4 text-center">
        <h2 className="text-2xl font-bold">Temporal and Spatial Context Visualization</h2>
        <p className="text-sm text-gray-500">Analyzing the distribution of temporal and spatial contexts in referenced signals.</p>
      </div>
      <div className="card-content flex-1">
        <ContextStackedBarChart />
      </div>
    </div>
  );
};

export default ContextStackedBarCard; // Default export
