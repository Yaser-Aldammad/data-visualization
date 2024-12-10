"use client";

import React, { useState, useEffect } from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import processData from "../../../../data/processData"; // Adjust the path as needed

const EncoderDecoderHeatmap: React.FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [encoders, setEncoders] = useState<string[]>([]);
  const [decoders, setDecoders] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log("Raw messages:", processData.messages);

      if (!Array.isArray(processData.messages)) {
        throw new Error("Invalid data format: messages must be an array.");
      }

      const encodersSet = new Set(
        processData.messages.map((msg) => msg.messageEncoder)
      );
      const decodersSet = new Set(
        processData.messages.map((msg) => msg.messageDecoder)
      );

      console.log("Encoders:", encodersSet);
      console.log("Decoders:", decodersSet);

      const encoderList = Array.from(encodersSet);
      const decoderList = Array.from(decodersSet);

      const interactionMatrix = encoderList.map((encoder) =>
        decoderList.map((decoder) => {
          const count = processData.messages.filter(
            (msg) =>
              msg.messageEncoder === encoder && msg.messageDecoder === decoder
          ).length;
          return count || 0;
        })
      );

      console.log("Interaction Matrix:", interactionMatrix);

      setEncoders(encoderList);
      setDecoders(decoderList);
      setMatrix(interactionMatrix);
    } catch (e: any) {
      setError(e.message);
      console.error("Error processing data:", e);
    }
  }, []);

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error loading heatmap:</p>
        <pre>{error}</pre>
      </div>
    );
  }

  if (!matrix.length || !encoders.length || !decoders.length) {
    return <p>Loading heatmap...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">
        Encoder-Decoder Pair Frequency Heatmap
      </h2>
      <div
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        <HeatMapGrid
          key={matrix.flat().join(",")} // Force re-render when matrix changes
          data={matrix}
          xLabels={decoders}
          yLabels={encoders}
cellStyle={(x, y, value) => ({
  backgroundColor: value
    ? `rgba(0, 128, 255, ${value / Math.max(...matrix.flat())})`
    : "rgba(255, 255, 255, 1)",
  border: "2px solid #ddd", // Thicker border for visibility
  width: "60px",
  height: "60px",
  textAlign: "center",
  lineHeight: "60px",
})}
          cellRender={(x, y, value) =>
            value ? <span style={{ color: "#000" }}>{value}</span> : ""
          }
          xLabelsStyle={(index) => ({
            fontSize: "0.9rem",
            transform: "rotate(35deg)",
            textAlign: "right",
            marginBottom: "40px",
          })}
          yLabelsStyle={() => ({
            fontSize: "0.9rem",
            textAlign: "right",
            marginRight: "10px",
          })}
        />
      </div>
      <p className="text-sm mt-4">
        Frequency of interactions between message encoders (rows) and message
        decoders (columns).
      </p>
    </div>
  );
};

export default EncoderDecoderHeatmap;
