declare module "react-chord-diagram" {
  import React from "react";

  interface ChordDiagramProps {
    matrix: number[][];
    componentId?: number;
    groupLabels?: string[];
    groupColors?: string[];
    arcHoverOpacity?: number;
    arcWidth?: number;
    ribbonHoverOpacity?: number;
    width?: number;
    height?: number;
    labelColors?: () => string;
    labelFontSize?: number;
    labelDistance?: number;
    labelRotate?: boolean;
  }

  const ChordDiagram: React.FC<ChordDiagramProps>;
  export default ChordDiagram;
}
