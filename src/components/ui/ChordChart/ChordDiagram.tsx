"use client";

import React, { useState, useEffect } from "react";
import ChordDiagram from "react-chord-diagram";
import processData from "../../../../data/processData";

const EncoderDecoderChord: React.FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [nodes, setNodes] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const { matrix, uniqueNodes } = processData.processChordData(processData.messages);
    setMatrix(matrix);
    setNodes(uniqueNodes);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredNode(nodes[index]);
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Encoder-Decoder Relationships</h2>
      <div className="w-full max-w-[700px] h-[400px] flex justify-center items-center mb-6">
        <ChordDiagram
          matrix={matrix}
          componentId={1}
          groupLabels={nodes}
          groupColors={nodes.map((_, i) => `hsl(${(i * 137) % 360}, 70%, 50%)`)}
          arcHoverOpacity={0.7}
          arcWidth={0.1}
          ribbonHoverOpacity={0.7}
          width={700}
          height={400}
          onMouseEnter={(index) => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
        />
      </div>
      {/* Legend Table */}
      <div className="mt-6 text-center w-full max-w-[700px]">
        <h3 className="text-lg font-semibold">Legend: Nodes and Connections</h3>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2">Color</th>
              <th className="border px-4 py-2 text-left">Node</th>
              <th className="border px-4 py-2 text-left">Hovered</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr
                key={node}
                className={`${hoveredNode === node ? "bg-gray-200" : ""}`}
              >
                <td className="border px-4 py-2 text-center">
                  <div
                    className="w-4 h-4 rounded-full mx-auto"
                    style={{
                      backgroundColor: `hsl(${(index * 137) % 360}, 70%, 50%)`,
                    }}
                  ></div>
                </td>
                <td className="border px-4 py-2">{node}</td>
                <td className="border px-4 py-2 text-center">
                  {hoveredNode === node ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EncoderDecoderChord;
