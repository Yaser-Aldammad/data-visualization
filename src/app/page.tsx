
import { Metadata } from "next";
import { PieCard } from "@/components/ui/PieChart/card";
import { BubbleCard } from "@/components/ui/BubbleChart/card";
import  TreemapCard from "@/components/ui/TreemapChart/Card";
import ContextStackedBarCard from "@/components/ui/StackedBarChart/Card";
import ChordCard from "@/components/ui/ChordChart/ChordDiagram";
import EncoderDecoderBarChart from "@/components/ui/barChart/BarChart";


export const metadata: Metadata = {
  title: 'Data Visualization',
  description: 'Data visualization, Data Science',
};

export default function Home() {

  return (
    <>
      <h1>Data Visualization</h1>
      <EncoderDecoderBarChart/>
      < ChordCard/>
      <ContextStackedBarCard/>
      <TreemapCard />
      <PieCard />
      <BubbleCard />
    </>
  );
}