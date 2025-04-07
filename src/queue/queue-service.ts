import { Queue, QueueEvents } from "bullmq";
import IORedis from "ioredis";
import type { JobData } from "../models/job";
import { JobStatus } from "../models/job";

// Redis connection
const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number.parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
});

// Create a queue
const jobQueue = new Queue("job-queue", { connection });

// Queue events for monitoring
const queueEvents = new QueueEvents("job-queue", { connection });

/**
 * Adds a job to the queue.
 *
 * @param jobData - The data for the job to be added.
 * @returns The ID of the added job.
 */
export const addJob = async (jobData: JobData) => {
  const job = await jobQueue.add(jobData.type, jobData.payload, {
    priority: jobData.priority || 0,
    attempts: 3, // Retry up to 3 times on failure
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });

  return job.id;
};

/**
 * Gets the status of a job by its ID.
 *
 * @param jobId - The ID of the job to retrieve.
 * @returns The status of the job, or null if not found.
 */
export const getJob = async (jobId: string) => {
  const job = await jobQueue.getJob(jobId);
  if (!job) return null;

  const state = await job.getState();
  let status: JobStatus;

  switch (state) {
    case "active":
      status = JobStatus.PROCESSING;
      break;
    case "completed":
      status = JobStatus.COMPLETED;
      break;
    case "failed":
      status = JobStatus.FAILED;
      break;
    default:
      status = JobStatus.PENDING;
  }

  return {
    id: job.id,
    status,
    type: job.name,
    createdAt: job.timestamp ? new Date(job.timestamp) : new Date(),
    updatedAt: job.processedOn ? new Date(job.processedOn) : undefined,
    completedAt: job.finishedOn ? new Date(job.finishedOn) : undefined,
    result: job.returnvalue,
    error: job.failedReason,
  };
};

export { jobQueue, queueEvents };
