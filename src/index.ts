import express from "express";
import type { Request, Response } from "express";
import { createJob, getJob, getAllJobs } from "./queue";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the Job Queue API" });
});

app.get("/jobs", (req: Request, res: Response) => {
  const jobs = getAllJobs();
  if (jobs.length === 0) {
    res.status(404).json({ error: "No jobs found" });
    return;
  }
  res.status(200).json(jobs);
});

app.post("/jobs", (req: Request, res: Response) => {
  const id = createJob(req.body);
  res.status(202).json({ message: "Job accepted", jobId: id });
});

app.get("/jobs/:id", (req: Request<{ id: string }>, res: Response) => {
  const job = getJob(req.params.id);

  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  res.status(200).json(job);
});

app.listen(3000, () => {
  console.log("🚀 API server running at http://localhost:3000");
});
