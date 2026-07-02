# Architecture

## Overview

The project follows a layered architecture that separates responsibilities between HTTP handling, business rules, persistence, and external integrations.

```
HTTP Request
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services
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

## Target Project Structure

```
src/
├── app.ts
├── server.ts
├── controller/
├── services/
├── repositories/
├── routes/
├── database/
└── errors/

prisma/
docker-compose.yml
```

---

## Layers

### Routes

Responsibilities:

- Register HTTP routes
- Connect endpoints to controllers

No business logic.

---

### Controllers

Responsibilities:

- Receive HTTP requests
- Call services
- Return standardized HTTP responses

No business rules.

---

### Services

Responsibilities:

- Business rules
- Data validation
- Holiday validation
- Date validation
- Passenger validation

---

### Repositories

Responsibilities:

- Database access
- Prisma queries
- CRUD operations

---

### Database

Responsibilities:

- Prisma Client
- Database initialization
- Database connection

---

### Errors

Responsibilities:

- Centralized error handling
- Standardized error responses

---

### External Services

Responsibilities:

- BrasilAPI integration
- Holiday lookup
- External API isolation

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
- Business rules inside Services
- Database access inside Repositories
- HTTP logic inside Controllers
- Centralized error handling
