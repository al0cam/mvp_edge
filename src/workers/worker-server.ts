import { Worker } from "bullmq";
import IORedis from "ioredis";
import { JobType } from "../models/job";
import * as processors from "./processors";

// Redis connection for the worker
const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number.parseInt(process.env.REDIS_PORT || "6379"),
  maxRetriesPerRequest: null,
});

// Create a worker with a processor function
const worker = new Worker(
  "job-queue",
  async (job) => {
    console.log(`Processing job ${job.id} of type ${job.name}`);

    // Select the appropriate processor based on job type
    switch (job.name as JobType) {
      case JobType.FILE_PROCESSING:
        return await processors.fileProcessor(job.data);
      case JobType.DATA_ENRICHMENT:
        return await processors.dataEnrichmentProcessor(job.data);
      case JobType.CALCULATION:
        return await processors.calculationProcessor(job.data);
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  },
  { connection },
);

// Notify about the start of the worker
console.log("Worker started and ready to process jobs");

// Handle worker events
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Worker shutting down...");
  await worker.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("Worker shutting down...");
  await worker.close();
  process.exit(0);
});
