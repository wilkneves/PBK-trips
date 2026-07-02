# Development Tasks

## Environment

- [x] macOS updated
- [x] Homebrew installed
- [x] Xcode Command Line Tools installed
- [x] Node.js installed
- [x] npm installed
- [x] Git configured
- [x] Docker Desktop installed
- [x] GitHub SSH configured

---

## Project Setup

- [x] Initialize Node project
- [x] Configure TypeScript
- [x] Configure `tsconfig.json`
- [x] Install Fastify
- [x] Install Prisma
- [x] Configure Prisma
- [x] Install Vitest

---

## Database

- [x] Configure Docker Compose
- [x] Create PostgreSQL container
- [x] Configure Prisma schema
- [x] Create first migration
- [x] Generate Prisma Client
- [x] Create `init:db`
- [x] Populate database with 10 records
- [x] Create `.env.example`

---

## API

- [x] `GET /health`
- [x] `GET /trip-requests`
- [x] `GET /trip-requests/:id`
- [x] `POST /trip-requests`
- [x] `PATCH /trip-requests/:id/cancel`
- [x] `GET /holidays/:year`

---

## Business Rules

- [x] Validate required fields
- [x] Validate ISO 8601 dates
- [x] Normalize dates
- [x] Validate `returnAt >= departureAt`
- [x] Validate `passengerCount > 0`
- [x] Validate national holidays
- [x] Prevent duplicate cancellation

---

## Error Handling

- [x] Create `AppError`
- [x] Global error handler
- [x] Standardized errors
- [x] Internal error handling

---

## BrasilAPI

- [x] Holidays client
- [x] `GET /holidays/:year`
- [x] Real-time consultation
- [x] Handle unavailable API
- [x] Block holiday trips

---

## Automated Tests

- [x] Valid trip creation
- [x] Invalid return date
- [x] Invalid passenger count
- [x] Holiday validation
- [x] Trip request not found
- [x] Cancel trip request
- [x] Cancel already canceled request

---

## Documentation

- [x] `README.md`
- [x] `PROJECT_CONTEXT.md`
- [x] `API_SPEC.md`
- [x] `ARCHITECTURE.md`
- [x] `DECISIONS.md`
- [x] `TASKS.md`
- [x] `.env.example`

---

## Git

- [x] Git initialized
- [x] First commit
- [x] Incremental commits
- [x] Final release commit

---

## Next Milestone

All milestones for the assessment scope are complete.
