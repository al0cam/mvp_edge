export type JobStatus = "pending" | "processing" | "done" | "failed";

export interface Job {
  id: string;
  data: any;
  status: JobStatus;
  result?: any;
}
