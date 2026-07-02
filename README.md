# PBK Trips — Institutional Trip Requests API

Second practical assessment for the Backend Programming course (UESPI) — a REST API for managing
institutional trip requests: creation, listing, lookup, and cancellation, with business rule
validation and national holiday checking against BrasilAPI.

## Team

- Enzo Damasceno Falcão
- José Wilk Souza Lima

## Description

The API allows an institution to register trip requests (`trip-requests`). On creation, the request
is validated (required fields, ISO 8601 dates, passenger count, return date) and the departure date
is checked against Brazilian national holidays via BrasilAPI. Requests can later be listed, retrieved
by id, or canceled. There is no authentication, approval workflow, vehicle/driver allocation, or
frontend — this is backend-only, per the assignment scope.

## Technologies

- Node.js 20+ (developed/tested with Node.js 24)
- TypeScript (`strict: true`)
- Fastify
- Prisma ORM
- PostgreSQL 17
- Docker Compose
- Vitest
- BrasilAPI — Feriados Nacionais (native `fetch`)

## Database (SGBD)

PostgreSQL 17, executed via Docker Compose (`backend/docker-compose.yml`).

## Package manager

npm (used throughout this README; all commands run from the `backend/` folder).

## Project structure

```
backend/          → REST API source code
backend/docs/      → Technical documentation (architecture, decisions, API spec)
backend/prisma/     → Prisma schema and migrations
backend/src/
  app.ts           → Fastify instance, route/error-handler registration
  server.ts        → HTTP server bootstrap
  routes/          → HTTP route definitions
  controller/       → Request/response handling
  services/         → Business rules and validation
  repositories/      → Database access (Prisma)
  external/         → BrasilAPI client
  errors/           → AppError, error codes, centralized error handler
  utils/            → Shared validation helpers
  database/         → Prisma client and init:db script
backend/test/       → Vitest automated tests
```

## Prerequisites

- Node.js 20 or higher
- npm
- Docker and Docker Compose

## 1. Install dependencies

```bash
cd backend
npm install
```

## 2. Configure the environment

```bash
cp .env.example .env
```

The values in `.env.example` are already functional and match the service defined in
`docker-compose.yml` — no manual editing is required.

| Variable | Description |
|---|---|
| `NODE_ENV` | Application execution environment |
| `PORT` | HTTP port the API listens on |
| `DATABASE_URL` | PostgreSQL connection string (must match `docker-compose.yml`) |
| `HOLIDAYS_API_BASE_URL` | Base URL of the national holidays API (BrasilAPI) |

## 3. Start the database (Docker Compose)

```bash
docker compose up -d
```

This starts a PostgreSQL 17 container (`backend-postgres`) with database `backend_db`, exposed on
port `5432`, matching `DATABASE_URL` in `.env.example`.

## 4. Initialize and populate the database

```bash
npm run init:db
```

This applies the Prisma migrations (creating the `trip_requests` table) and inserts 10 sample trip
requests. It can be run multiple times without breaking the application (it clears and re-seeds the
`trip_requests` table). It does **not** seed or mirror national holidays — those are always obtained
from BrasilAPI at request time.

## 5. Run the application

```bash
npm run dev    # development, with auto-reload
# or
npm run build && npm run start   # production build
```

The API will be available at `http://localhost:3000`.

## 6. Run the automated tests

```bash
npm test
```

Tests run with Vitest against the same PostgreSQL database configured by `DATABASE_URL` (the
`trip_requests` table is cleaned between tests). Calls to BrasilAPI are stubbed via a fake `fetch`
implementation (`test/helpers/holidays-mock.ts`), so the suite does not depend on the real BrasilAPI
being available.

## Response format

All responses follow a standardized envelope.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "A clear and objective error message"
  }
}
```

### Error codes

| Code | HTTP status | Situation |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Missing, invalid, or malformed required data |
| `TRIP_REQUEST_NOT_FOUND` | 404 | Trip request not found |
| `TRIP_REQUEST_ALREADY_CANCELED` | 409 | Attempt to cancel an already canceled trip request |
| `HOLIDAY_TRIP_NOT_ALLOWED` | 409 | Departure date falls on a national holiday |
| `HOLIDAYS_API_UNAVAILABLE` | 502 | BrasilAPI is unreachable or returned an error |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected application error |

## Endpoints

Base URL: `http://localhost:3000`

### `POST /trip-requests`

Creates a new trip request. Validates required fields, ISO 8601 dates (normalized to UTC),
`returnAt >= departureAt`, `passengerCount > 0`, and that `departureAt` is not a Brazilian national
holiday (checked in real time against BrasilAPI). New requests start with status `pending`.

Request body:

```json
{
  "requesterName": "Maria Silva",
  "origin": "Parnaíba",
  "destination": "Teresina",
  "departureAt": "2026-08-24T10:00:00.000Z",
  "returnAt": "2026-08-24T18:00:00.000Z",
  "purpose": "Participation in an institutional meeting",
  "passengerCount": 3
}
```

Response: `201 Created`

### `GET /trip-requests`

Lists all trip requests. Returns `200 OK` with an array (empty if none exist).

### `GET /trip-requests/:id`

Retrieves a trip request by id. Returns `200 OK`, or `404 Not Found` (`TRIP_REQUEST_NOT_FOUND`) if it
does not exist.

### `PATCH /trip-requests/:id/cancel`

Cancels an existing trip request (status becomes `canceled`). Returns `200 OK`, `404 Not Found`
(`TRIP_REQUEST_NOT_FOUND`) if the trip request does not exist, or `409 Conflict`
(`TRIP_REQUEST_ALREADY_CANCELED`) if it is already canceled.

### `GET /holidays/:year`

Returns Brazilian national holidays for the given year, obtained from BrasilAPI in real time.
Returns `200 OK`, or `502 Bad Gateway` (`HOLIDAYS_API_UNAVAILABLE`) if BrasilAPI is unreachable.

Response example:

```json
{
  "success": true,
  "data": [
    { "date": "2026-01-01", "name": "Confraternização Universal", "type": "national" }
  ]
}
```

### `GET /health`

Health check. Returns `200 OK` with `{ "status": "ok" }`.

## Additional documentation

See `backend/docs/` for architecture, technical decisions, and the detailed API specification.
