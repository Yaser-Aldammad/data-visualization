"use client";

import React from "react";
import { Sankey, Tooltip } from "recharts";
import { processData } from "./processData";

const SankeyDiagram: React.FC = () => {
  const rawData = processData();

  const nodes: { name: string }[] = [];
  const links: {
    source: string;
    target: string;
    value: number;
    type: string;
  }[] = [];

  // Populate nodes and links
  rawData.forEach((item) => {
    if (!nodes.some((node) => node.name === item.encoder)) {
      nodes.push({ name: item.encoder });
    }
    if (!nodes.some((node) => node.name === item.decoder)) {
      nodes.push({ name: item.decoder });
    }

    links.push({
      source: item.encoder,
      target: item.decoder,
      value: 1,
      type: item.type,
    });
  });

  // Prepare Sankey data with unique keys
  const sankeyData = {
    nodes,
    links: links.map((link, index) => ({
      id: `link-${link.source}-${link.target}-${link.type}-${index}`, // Unique key using source, target, type, and index
      source: nodes.findIndex((n) => n.name === link.source),
      target: nodes.findIndex((n) => n.name === link.target),
      value: link.value,
      type: link.type,
    })),
  };

  // Debugging: Ensure all nodes and links are unique
  console.log("Nodes:", sankeyData.nodes);
  console.log("Links:", sankeyData.links);

  // Color mapping for link types
  const typeColors: Record<string, string> = {
    "Body Language": "#FF5733",
    "Light Signals": "#33FF57",
    "Other Signals": "#3357FF",
    "Unknown Type": "#888888", // Fallback for unknown types
  };

  return (
    <div style={{ width: "100%", height: 600 }}>
      <Sankey
        width={960}
        height={500}
        data={sankeyData}
        nodePadding={40}
        nodeWidth={15}
        link={{
          stroke: (d: any) => typeColors[d.type] || "#888888",
          strokeWidth: (d: any) => Math.max(1, d.value), // Optional: dynamically adjust link width
        }}
      >
        <Tooltip />
      </Sankey>
    </div>
  );
};

export default SankeyDiagram;
