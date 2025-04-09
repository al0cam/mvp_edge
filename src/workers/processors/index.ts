// Mock processors for different job types

import { growthStageASCIIArt, growthStages } from "../../models/tree";

/**
 * Processes a file processing job.
 * This is a mock implementation that simulates file processing.
 *
 * @param data - The data for the file processing job.
 * @returns A promise that resolves to the processed file data.
 * @throws Error if the processing fails.
 */
export const fileProcessor = async (data: any) => {
  console.log("Processing file job:", data);

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate file processing (e.g., resizing an image, parsing a document)
  const result = {
    originalData: data,
    processedAt: new Date(),
    fileSize: data.size || `${Math.floor(Math.random() * 1000)}KB`,
    processingTime: "2 seconds",
    status: "success",
  };

  return result;
};

/**
 * Processes a data enrichment job.
 * This is a mock implementation that simulates data enrichment.
 *
 * @param data - The data for the data enrichment job.
 * @returns A promise that resolves to the enriched data.
 */
export const dataEnrichmentProcessor = async (data: any) => {
  console.log("Processing data enrichment job:", data);

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate data enrichment (e.g., adding metadata, fetching additional information)
  const result = {
    originalData: data,
    processedAt: new Date(),
    enrichedFields: {
      metadata: {
        processedBy: `Worker-${Math.floor(Math.random() * 10)}`,
        confidence: Math.random().toFixed(2),
      },
      additionalInfo: {
        category: ["category1", "category2", "category3"][
          Math.floor(Math.random() * 3)
        ],
        tags: ["tag1", "tag2", "tag3"].slice(
          0,
          Math.floor(Math.random() * 3) + 1,
        ),
      },
    },
  };

  return result;
};

/**
 * Processes a calculation job.
 * This is a mock implementation that simulates complex calculations.
 *
 * @param data - The data for the calculation job.
 * @returns A promise that resolves to the calculation result.
 */
export const calculationProcessor = async (data: any) => {
  console.log("Processing calculation job:", data);

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Simulate complex calculation
  let result;

  try {
    // Simple demonstration calculation
    if (data.operation === "add") {
      result = data.numbers.reduce((a: number, b: number) => a + b, 0);
    } else if (data.operation === "multiply") {
      result = data.numbers.reduce((a: number, b: number) => a * b, 1);
    } else if (data.operation === "complex") {
      // Simulate complex calculation
      result = {
        sum: data.numbers.reduce((a: number, b: number) => a + b, 0),
        product: data.numbers.reduce((a: number, b: number) => a * b, 1),
        average:
          data.numbers.reduce((a: number, b: number) => a + b, 0) /
          data.numbers.length,
        min: Math.min(...data.numbers),
        max: Math.max(...data.numbers),
      };
    } else {
      throw new Error(`Unknown operation: ${data.operation}`);
    }

    return {
      input: data,
      result,
      processedAt: new Date(),
      processingTime: "3 seconds",
    };
  } catch (error: any) {
    throw new Error(`Calculation failed: ${error.message}`);
  }
};

/**
* Processes a tree planting job.
* This is just a minigame for fun.
*
* @param data - The data for the tree planting job.
* @returns A promise that resolves to the tree growth result.
*/
export const treeProcessor = async (data: any) => {
  console.log("Processing tree job:", data);

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2500));

  let growthStage = growthStages[0];

  while (growthStage !== growthStages[growthStages.length - 1]) {
    console.log(`Tree is now a ${growthStage}`);
    console.log(growthStageASCIIArt[growthStage]);
    // Simulate growth time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Move to the next growth stage
    const currentIndex = growthStages.indexOf(growthStage);
    if (currentIndex < growthStages.length - 1) {
      growthStage = growthStages[currentIndex + 1];
    }
  }
  console.log("Tree has fully grown!");
  console.log(growthStageASCIIArt[growthStage]);
  return {
    originalData: data,
    processedAt: new Date(),
    growthStage: growthStages[growthStages.length - 1],
    status: "success",
  };
};
