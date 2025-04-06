import { Router } from "express";
import type { Request, Response } from "express";
import { submitJob, getJobStatus, cancelJob } from "./controllers";

const router = Router();

// Submit a new job
router.post("/jobs", (req: Request<any>, res: Response<any>) => {
  submitJob(req, res);
});

// Get job status
router.get("/jobs/:id", (req: Request<any>, res: Response<any>) => {
  getJobStatus(req, res);
});

// Cancel a job
router.delete("/jobs/:id", (req: Request<any>, res: Response<any>) => {
  cancelJob(req, res);
});

export default router;
