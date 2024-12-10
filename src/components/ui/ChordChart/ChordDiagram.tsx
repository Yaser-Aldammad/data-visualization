"use client";

import React, { useState, useEffect } from "react";
import ChordDiagramClientWrapper from "./wrapper"; // Import the wrapper
import processData from "../../../../data/processData";
const EncoderDecoderChord: React.FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [nodes, setNodes] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [connections, setConnections] = useState<number[]>([]);

  useEffect(() => {
    const { matrix, uniqueNodes } = processData.processChordData(processData.messages);

    // Calculate the number of connections for each node
    const nodeConnections = uniqueNodes.map((_, i) =>
      matrix[i].reduce((sum, val) => sum + val, 0) + // Sum of row
      matrix.reduce((sum, row) => sum + row[i], 0)  // Sum of column
    );

    setMatrix(matrix);
    setNodes(uniqueNodes);
    setConnections(nodeConnections);
  }, []);

  return (
    <div
      className="flex flex-col items-center bg-white shadow-lg p-10 rounded-lg max-w-[1200px] mx-auto"
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Encoder-Decoder Relationships</h2>
      <p className="text-sm text-gray-600">Visualize encoder-decoder interactions.</p>


      <div
        className="svg-container"
        style={{
          width: "800px",
          height: "800px",
          padding: "50px",
          boxSizing: "border-box",
          overflow: "visible",
        }}
      >
        <ChordDiagramClientWrapper matrix={matrix} nodes={nodes} />
      </div>

      <div className="mt-12 w-full">
        <h3 className="text-lg font-semibold mb-6 text-center">
          Legend: Nodes and Connections
        </h3>
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-center">Color</th>
              <th className="border px-4 py-2 text-center">Node</th>
              <th className="border px-4 py-2 text-center">Connections</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr
                key={node}
                className={`${hoveredNode === node ? "bg-gray-200" : ""}`}
              >
                <td className="border px-2 py-1">
                  <div
                    className="w-4 h-4 rounded-full mx-auto"
                    style={{
                      backgroundColor: `hsl(${(index * 137) % 360}, 70%, 50%)`,
                    }}
                  ></div>
                </td>
                <td className="border px-2 py-1 text-center align-middle">{node}</td>
                <td className="border px-2 py-1 text-center align-middle">{connections[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EncoderDecoderChord;
