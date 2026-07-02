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
- [ ] Create `.env.example`

---

## API

- [x] `GET /health`
- [x] `GET /trip-requests`
- [x] `GET /trip-requests/:id`
- [ ] `POST /trip-requests`
- [ ] `PATCH /trip-requests/:id/cancel`
- [ ] `GET /holidays/:year`

---

## Business Rules

- [ ] Validate required fields
- [ ] Validate ISO 8601 dates
- [ ] Normalize dates
- [ ] Validate `returnAt >= departureAt`
- [ ] Validate `passengerCount > 0`
- [ ] Validate national holidays
- [ ] Prevent duplicate cancellation

---

## Error Handling

- [ ] Create `AppError`
- [ ] Global error handler
- [ ] Standardized errors
- [ ] Internal error handling

---

## BrasilAPI

- [ ] Holidays client
- [ ] `GET /holidays/:year`
- [ ] Cache or on-demand mirror
- [ ] Handle unavailable API
- [ ] Block holiday trips

---

## Automated Tests

- [ ] Valid trip creation
- [ ] Invalid return date
- [ ] Invalid passenger count
- [ ] Holiday validation
- [ ] Trip request not found
- [ ] Cancel trip request
- [ ] Cancel already canceled request

---

## Documentation

- [ ] `README.md`
- [x] `PROJECT_CONTEXT.md`
- [x] `API_SPEC.md`
- [x] `ARCHITECTURE.md`
- [x] `DECISIONS.md`
- [x] `TASKS.md`
- [ ] `.env.example`

---

## Git

- [x] Git initialized
- [x] First commit
- [ ] Incremental commits
- [ ] Final release commit

---

## Next Milestone

1. Centralized error handling
2. `POST /trip-requests`
3. `PATCH /trip-requests/:id/cancel`
4. Holidays endpoint
5. BrasilAPI integration
6. Automated tests
7. `README.md`
8. Final review
