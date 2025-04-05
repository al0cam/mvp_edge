import type { Job } from "./types";
import { randomUUID } from "node:crypto";

const jobs: Record<string, Job> = {};

export const createJob = (data: any): string => {
  const id = randomUUID();
  jobs[id] = { id, data, status: "pending" };

  // Simulate async processing
  setTimeout(() => {
    jobs[id].status = "processing";
    setTimeout(() => {
      jobs[id].status = "done";
      jobs[id].result = { processed: true, input: data };
    }, 2000);
  }, 500);

  return id;
};

export const getJob = (id: string): Job | undefined => jobs[id];

export const getAllJobs = (): Job[] => Object.values(jobs);
