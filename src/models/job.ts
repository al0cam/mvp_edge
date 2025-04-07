/**
 * JobStatus is an enum representing the possible statuses of a job.
 */
export enum JobStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

/**
 * JobType is an enum representing the different types of jobs that can be processed.
 */
export enum JobType {
  FILE_PROCESSING = "file_processing",
  DATA_ENRICHMENT = "data_enrichment",
  CALCULATION = "calculation",
}

/**
 * JobData is an interface representing the data structure of a job.
 */
export interface JobData {
  type: JobType;
  payload: any;
  priority?: number;
}

/**
 * JobResponse is an interface representing the response structure of a job.
 * It includes the job ID, status, type, timestamps, and any result or error message.
 */
export interface JobResponse {
  id: string;
  status: JobStatus;
  type: JobType;
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  result?: any;
  error?: string;
}

/**
 * JobExamples is an object containing examples of different job types and their payloads.
 */
export const jobExamples = {
  fileProcessing: {
    type: JobType.FILE_PROCESSING,
    payload: {
      filename: "example.jpg",
      size: "1024KB",
      format: "jpg",
      action: "resize",
      dimensions: { width: 800, height: 600 },
    },
  },
  dataEnrichment: {
    type: JobType.DATA_ENRICHMENT,
    payload: {
      recordId: "12345",
      data: {
        name: "Example product",
        description: "This is a sample product",
      },
      enrichmentSources: ["metadata", "categories", "related"],
    },
  },
  calculation: {
    type: JobType.CALCULATION,
    payload: {
      operation: "complex",
      numbers: [1, 2, 3, 4, 5],
    },
  },
};
