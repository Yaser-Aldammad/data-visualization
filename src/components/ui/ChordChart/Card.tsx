"use client";

import React from "react";
import EncoderDecoderChord from "./ChordDiagram"; // Ensure the path is correct




const ChordCard: React.FC = () => {
  return (
<div className="card flex flex-col p-8 shadow-xl rounded-xl bg-white max-w-5xl mx-auto border border-gray-200">
      <div className="card-content flex-1">
        <EncoderDecoderChord />
      </div>
    </div>
  );
};

export default ChordCard;