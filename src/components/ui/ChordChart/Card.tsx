"use client";

import React from "react";
import EncoderDecoderChord from "./ChordDiagram"; // Ensure the path is correct

const ChordCard: React.FC = () => {
  return (
    <div className="card flex flex-col p-6 shadow-lg rounded-lg bg-white max-w-5xl mx-auto">
      <div className="card-header mb-4 text-center">
        <h2 className="text-2xl font-bold">Referenced Document Distribution</h2>
        <p className="text-sm text-gray-500">Explore the encoder-decoder relationships visually.</p>
      </div>
      <div className="card-content flex-1">
        <EncoderDecoderChord />
      </div>
    </div>
  );
};

export default ChordCard;
