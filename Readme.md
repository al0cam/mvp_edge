# Distributed Message Processing System

A scalable, fault-tolerant system for processing jobs across multiple workers built with Node.js, Express, TypeScript, Redis, and BullMQ.

## Overview

This system allows you to submit processing jobs through a RESTful API, which are then distributed to available workers for asynchronous processing. The system provides job status tracking and can handle worker failures gracefully.

## Features

- RESTful API for job submission and status tracking
- Distributed worker architecture using BullMQ and Redis
- Fault tolerance with automatic job retries
- Supports multiple job types (file processing, data enrichment, calculations)
- Horizontally scalable (run as many workers as needed)

## Prerequisites

- Node.js (v14+)
- Redis server running locally or accessible remotely
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Ensure Redis is running (default: localhost:6379)

## Running the System

### Start the API Server

```
npm run dev
```

This starts the RESTful API server on port 3000 (or the port specified in the PORT environment variable).

### Start Worker(s)

```
ts-node ./src/workers/worker-server.ts
```

You can start multiple worker instances to scale processing capacity.

## API Usage

### Submit a Job

```
POST /api/jobs

Body:
{
  "type": "calculation",
  "payload": {
    "operation": "complex",
    "numbers": [1, 2, 3, 4, 5]
  }
}
```

Response:
```
{
  "message": "Job submitted successfully",
  "jobId": "123456789",
  "status": "pending"
}
```

### Check Job Status

```
GET /api/jobs/:id
```

Response:
```
{
  "id": "123456789",
  "status": "completed",
  "type": "calculation",
  "createdAt": "2025-04-06T12:00:00.000Z",
  "completedAt": "2025-04-06T12:00:05.000Z",
  "result": {
    "sum": 15,
    "product": 120,
    "average": 3,
    "min": 1,
    "max": 5
  }
}
```

## Job Types

The system supports the following job types:

### File Processing
Process files with various operations (e.g., resize images)

### Data Enrichment
Enhance data by adding metadata or additional information

### Calculation
Perform complex calculations on numerical data

## Architecture

- **API Server**: Handles HTTP requests, job submission, and status queries
- **Redis**: Serves as the message broker and job queue
- **Workers**: Process jobs from the queue asynchronously
- **BullMQ**: Provides the queue management system for distributed processing

## Project Structure

```
/src
  /api
    routes.ts      # API route definitions
    controllers.ts # Request handlers
  /workers
    processors/    # Job processors for different job types
    worker-server.ts # Worker entry point
  /models
    job.ts         # Job data models/interfaces
    tree.ts        # Models for tree structure
  /queue
    queue-service.ts # BullMQ queue setup and management
  index.ts         # API server entry point
```

## Scaling

The system is designed to scale horizontally:
- Run multiple worker instances to increase processing capacity
- Redis handles job distribution across all available workers
- Each worker can be run on a separate machine or container

## Demonstration

In the following video, we demonstrate the system in action:

https://github.com/user-attachments/assets/d6c18d9f-fa8c-46fc-9a76-9889f9c9c20f

As you can see, the video showcases the job submission process, the workers processing jobs, and the API responses for job status tracking. The system is capable of handling multiple job types and can scale to meet demand.
