"use client";

import React from "react";
import TreemapChart from "./TreemapChart"; // Ensure the path is correct

const TreemapCard: React.FC = () => {
  return (
    <div className="card flex flex-col p-6 shadow-lg rounded-lg bg-white max-w-5xl mx-auto">
      <div className="card-header mb-4 text-center">
        <h2 className="text-2xl font-bold">Referenced Document Distribution</h2>
        <p className="text-sm text-gray-500">Explore document references visually.</p>
      </div>
      <div className="card-content flex-1">
        <TreemapChart />
      </div>
    </div>
  );
};

export default TreemapCard;
