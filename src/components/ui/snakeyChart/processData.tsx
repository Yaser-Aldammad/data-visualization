import data from '../../../../data/data.json';

export interface MessageData {
  id: string;
  message: string;
  encoder: string;
  decoder: string;
  type: string;
  categories: string;
  spatialContext: string;
  temporalContext: string;
}

// Function to process and format data for components
export const processData = (): MessageData[] => {
  const processedData = data.messages.map((item: any) => ({
    id: item.id,
    message: item.message || 'Unknown Message',
    encoder: item.messageEncoder || 'Unknown Encoder',
    decoder: item.messageDecoder || 'Unknown Decoder',
    type: item.type || 'Unknown Type',
    categories: (item.categories || []).join(', ') || 'Uncategorized',
    spatialContext: item.spatialContext || 'Unknown Context',
    temporalContext: item.temporalContext || 'Unknown Time',
  }));

  console.log("Processed Data:", processedData); // Debugging
  return processedData;
};
