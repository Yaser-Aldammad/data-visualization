"use client";

import React from "react";
import ChordDiagram from "react-chord-diagram";

const ChordDiagramClientWrapper = ({ matrix, nodes }: { matrix: number[][]; nodes: string[] }) => {
  return (
    <div className="chord-diagram-wrapper">
      <ChordDiagram
        matrix={matrix}
        componentId={1}
        groupLabels={nodes}
        groupColors={nodes.map((_, i) => `hsl(${(i * 137) % 360}, 70%, 50%)`)}
        arcHoverOpacity={0.7}
        arcWidth={0.1}
        ribbonHoverOpacity={0.7}
        width={700}
        height={700}
        labelColors={() => "#000"}
        labelFontSize={12}
        labelDistance={120}
        labelRotate={true}
      />
    </div>
  );
};

export default ChordDiagramClientWrapper;
