import type { Request, Response } from "express";
import { addJob, getJob } from "../queue/queue-service";
import { JobType } from "../models/job";
import type { JobData } from "../models/job";

/**
 * Job Controller
 * Handles job submission, status retrieval, and cancellation.
 *
 * @module controllers
 * @requires express
 * @requires ../queue/queue-service
 * @requires ../models/job
 * @exports submitJob
 * @exports getJobStatus
 * @exports cancelJob
 */

/**
 * Submits a new job to the queue.
 *
 * @function submitJob
 * @param {Request} req - The request object containing job data.
 * @param {Response} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves when the job is submitted.
 * @throws {Error} - If there is an error while submitting the job.
 */
export const submitJob = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const jobData: JobData = req.body;

    // Validate job data
    if (!jobData.type || !Object.values(JobType).includes(jobData.type)) {
      return res.status(400).json({ error: "Invalid job type" });
    }

    if (!jobData.payload) {
      return res.status(400).json({ error: "Job payload is required" });
    }

    // Add job to queue
    const jobId = await addJob(jobData);

    res.status(202).json({
      message: "Job submitted successfully",
      jobId,
      status: "pending",
    });
  } catch (error: any) {
    console.error("Error submitting job:", error);
    res.status(500).json({
      error: "Failed to submit job",
      message: error.message,
    });
  }
};

/**
 * Retrieves the status of a job.
 *
 * @function getJobStatus
 * @param {Request} req - The request object containing the job ID.
 * @param {Response} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves when the job status is retrieved.
 * @throws {Error} - If there is an error while retrieving the job status.
 */
export const getJobStatus = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { id } = req.params;
    const job = await getJob(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error: any) {
    console.error("Error getting job status:", error);
    res.status(500).json({
      error: "Failed to get job status",
      message: error.message,
    });
  }
};

/**
 * Cancels a job.
 *
 * @function cancelJob
 * @param {Request} req - The request object containing the job ID.
 * @param {Response} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves when the job is cancelled.
 * @throws {Error} - If there is an error while cancelling the job.
 */
export const cancelJob = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { id } = req.params;
    const job = await getJob(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // This is just a placeholder - implement actual cancellation logic
    res.status(200).json({ message: "Job cancellation not yet implemented" });
  } catch (error: any) {
    console.error("Error cancelling job:", error);
    res.status(500).json({
      error: "Failed to cancel job",
      message: error.message,
    });
  }
};
