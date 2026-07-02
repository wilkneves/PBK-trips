# Architecture

## Overview

The project separates responsibilities between HTTP handling, input validation, business rules,
persistence, and external integrations. There is no separate controller layer: route handlers call
services directly and build responses using shared helpers.

```
HTTP Request
      │
      ▼
Routes (http/routes)
      │
      ▼
Schemas (http/schemas) — input validation/parsing
      │
      ▼
Services — business rules
      │
      ▼
Repositories
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

---

## Project Structure

```
backend/
├── scripts/
│   └── init-db.ts
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── env.ts
│   ├── domain/
│   │   └── trip-request.ts
│   ├── errors/
│   │   ├── app-error.ts
│   │   ├── error-definitions.ts
│   │   └── error-handler.ts
│   ├── http/
│   │   ├── responses.ts
│   │   ├── routes/
│   │   │   ├── trip-requests-routes.ts
│   │   │   └── holidays-routes.ts
│   │   └── schemas/
│   │       └── trip-request-schemas.ts
│   ├── integrations/
│   │   └── holidays-client.ts
│   ├── repositories/
│   │   └── trip-request.repository.ts
│   ├── services/
│   │   ├── trip-request.service.ts
│   │   └── holiday.service.ts
│   └── database/
│       └── prisma.ts
├── tests/
├── prisma/
└── docker-compose.yml
```

---

## Layers

### Config

Centralizes reading and typing environment variables (`NODE_ENV`, `PORT`, `DATABASE_URL`,
`HOLIDAYS_API_BASE_URL`).

### Domain

Shared TypeScript types describing a trip request and its creation input.

### Routes (`http/routes`)

Responsibilities:

- Register HTTP routes
- Parse the request via the corresponding schema
- Call the relevant service
- Build the standardized HTTP response

No business rules.

### Schemas (`http/schemas`)

Responsibilities:

- Validate and parse raw request input (required fields, ISO 8601 dates, passenger count,
  `returnAt >= departureAt`)
- Convert dates to UTC `Date` instances before they reach the service layer

### Services

Responsibilities:

- Business rules that require persistence or external calls (holiday check, cancellation rules)
- Orchestrate repositories and integrations

### Repositories

Responsibilities:

- Database access
- Prisma queries
- CRUD operations

### Database

Responsibilities:

- Prisma Client instantiation

### Errors

Responsibilities:

- `AppError` and the `ErrorCode` → `{ statusCode, message }` mapping (`error-definitions.ts`)
- Centralized Fastify error handler and not-found handler

### Integrations

Responsibilities:

- BrasilAPI holidays client
- External API isolation (real-time consultation, no seeding/hardcoding)

---

## Database

### Engine

```
PostgreSQL
```

### ORM

```
Prisma 7
```

### Runs via

```
Docker Compose
```

---

## Main Entity

```prisma
model TripRequest {
  id             String   @id @default(uuid())
  requesterName  String
  origin         String
  destination    String
  departureAt    DateTime
  returnAt       DateTime
  purpose        String
  passengerCount Int
  status         String @default("pending")
  createdAt      DateTime @default(now())

  @@map("trip_requests")
}
```

---

## Response Standard

### Success

```json
{
  "success": true,
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Message in English"
  }
}
```

---

## Development Principles

- English identifiers
- camelCase variables
- PascalCase classes
- kebab-case files
- Input validation inside `http/schemas`
- Business rules inside `services`
- Database access inside `repositories`
- Centralized error handling
- ESLint + Prettier enforced via `npm run lint` / `npm run format`
