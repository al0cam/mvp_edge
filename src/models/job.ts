export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum JobType {
  FILE_PROCESSING = 'file_processing',
  DATA_ENRICHMENT = 'data_enrichment',
  CALCULATION = 'calculation'
}

export interface JobData {
  type: JobType;
  payload: any;
  priority?: number;
}

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

// Example job payloads for documentation/testing
export const jobExamples = {
  fileProcessing: {
    type: JobType.FILE_PROCESSING,
    payload: {
      filename: 'example.jpg',
      size: '1024KB',
      format: 'jpg',
      action: 'resize',
      dimensions: { width: 800, height: 600 }
    }
  },
  dataEnrichment: {
    type: JobType.DATA_ENRICHMENT,
    payload: {
      recordId: '12345',
      data: {
        name: 'Example product',
        description: 'This is a sample product'
      },
      enrichmentSources: ['metadata', 'categories', 'related']
    }
  },
  calculation: {
    type: JobType.CALCULATION,
    payload: {
      operation: 'complex',
      numbers: [1, 2, 3, 4, 5]
    }
  }
};
