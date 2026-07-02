# Project Context

## Overview

This project is the second practical assessment for the Backend Programming course at the Universidade Estadual do Piauí (UESPI).

The objective is to develop a REST API for managing institutional trip requests while following the technical and architectural requirements defined by the assignment.

---

## Project Information

| Item         | Description                            |
| ------------ | -------------------------------------- |
| Institution  | Universidade Estadual do Piauí (UESPI) |
| Course       | Programação Backend                    |
| Professor    | Eyder Rios                             |
| Assessment   | 2nd Practical Assessment               |
| Project Type | Backend REST API                       |

---

## Project Goal

Develop a REST API capable of:

- Creating trip requests
- Listing trip requests
- Retrieving a trip request by ID
- Canceling a trip request
- Consulting Brazilian national holidays

The application must persist data in PostgreSQL and validate business rules before saving data.

---

## Mandatory Technologies

- Node.js 20+
- TypeScript (`strict: true`)
- Fastify
- PostgreSQL
- Prisma ORM
- Docker Compose
- Vitest
- Git
- GitHub

---

## Environment Variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/backend_db?schema=public
HOLIDAYS_API_BASE_URL=https://brasilapi.com.br
```

---

## Main Resource

```
trip-requests
```

Main entity:

```
TripRequest
```

---

## Required Endpoints

```
GET /health

POST /trip-requests

GET /trip-requests

GET /trip-requests/:id

PATCH /trip-requests/:id/cancel

GET /holidays/:year
```

---

## Business Rules

- Return date must be greater than or equal to departure date.
- Passenger count must be greater than zero.
- Departure date cannot be a Brazilian national holiday.
- Holidays must be validated through BrasilAPI.
- New requests start with status `pending`.
- A canceled request cannot be canceled again.
- Missing resources must return standardized errors.

---

## External API

BrasilAPI

### Endpoint

```
GET /api/feriados/v1/{year}
```

### Base URL

```
https://brasilapi.com.br
```

---

## Database

### Engine

```
PostgreSQL
```

### ORM

```
Prisma
```

### Execution

```
Docker Compose
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

## Required Error Codes

- VALIDATION_ERROR
- TRIP_REQUEST_NOT_FOUND
- TRIP_REQUEST_ALREADY_CANCELED
- HOLIDAY_TRIP_NOT_ALLOWED
- HOLIDAYS_API_UNAVAILABLE
- INTERNAL_SERVER_ERROR

---

## Current Progress

### Completed

- Environment configuration
- Docker
- PostgreSQL
- Prisma
- Fastify
- `GET /health`
- `GET /trip-requests`
- `GET /trip-requests/:id`
- `POST /trip-requests`
- `PATCH /trip-requests/:id/cancel`
- `GET /holidays/:year`
- Centralized error handling (`AppError` + Fastify global error handler)
- BrasilAPI integration (real-time consultation, no seeding/hardcoding)
- `init:db`
- Prisma migration
- Seed with 10 records
- Automated tests (Vitest, BrasilAPI stubbed via fake `fetch`)
- `README.md`
- `.env.example`

---

### Pending

Nothing pending for the assessment's mandatory scope.

---

## Development Guidelines

- Use English for all code identifiers.
- Keep input validation inside `http/schemas`.
- Keep business rules inside Services.
- Keep database access inside Repositories.
- Keep HTTP logic inside `http/routes` route handlers.
- Use centralized error handling.
- Follow Conventional Commits.
- Run `npm run lint` and `npm run format:check` before pushing.
