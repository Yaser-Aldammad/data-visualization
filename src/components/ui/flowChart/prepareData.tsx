/* import data from '../../../../data/data.json';

// Define TypeScript interfaces
interface Message {
  id: string;
  premise: string;
  message: string;
  messageVariations: string[];
  description: string;
  meaning?: string;
  messageEncoder: string;
  messageDecoder: string;
  spatialContext: string;
  temporalContext: string;
  type: string;
  categories: string[];
  references: string[];
}

// Define structure for hierarchical data
interface HierarchyNode {
  id: string; // Ensure unique node IDs
  name: string;
  type?: string; // Optionally display the type of node
  description?: string; // Description for detailed view
  children?: HierarchyNode[];
}

const buildHierarchy = (maxDepth: number = 4): HierarchyNode => {
  const root: HierarchyNode = { id: 'root', name: 'Signals', children: [] };
  const typeMap: Record<string, HierarchyNode> = {};

  const addNode = (message: Message, depth: number) => {
    if (depth > maxDepth) return;

    const { id, type, messageEncoder, message: messageText, description, meaning, messageVariations } = message;

    if (!typeMap[type]) {
      typeMap[type] = { id: `type-${type}`, name: type, children: [] };
      root.children?.push(typeMap[type]);
    }

    let encoderNode = typeMap[type].children?.find((child) => child.name === messageEncoder);
    if (!encoderNode) {
      encoderNode = { id: `encoder-${messageEncoder}`, name: messageEncoder, children: [] };
      typeMap[type].children?.push(encoderNode);
    }

    encoderNode.children?.push({
      id: `message-${id}`,
      name: `${messageText}`,
      description: `${description || ''}`,
      type: message.type,
      children: depth < maxDepth
        ? messageVariations.map((variation) => ({
            id: `variation-${id}-${variation}`,
            name: variation,
            description: meaning,
          }))
        : [],
    });
  };

  data.messages.forEach((message) => addNode(message, 1));
  return root;
};

export const processData = {
  hierarchyData: buildHierarchy(4), // Limit depth to 4
};
 */


// processData.tsx

import data from '../../../../../data/data.json';

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
    message: item.message,
    encoder: item.messageEncoder,
    decoder: item.messageDecoder,
    type: item.type,
    categories: item.categories.join(', '),
    spatialContext: item.spatialContext,
    temporalContext: item.temporalContext,
  }));

  console.log("Processed Data:", processedData); // Debugging
  return processedData;
};
