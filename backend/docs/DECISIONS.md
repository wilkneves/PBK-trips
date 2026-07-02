# Technical Decisions

This document records the architectural and technical decisions adopted during the project.

---

## Programming Language

### Decision

TypeScript

### Reason

The assignment requires TypeScript running in strict mode.

Benefits:

- Static typing
- Better maintainability
- Better IDE support
- Safer refactoring

---

## Runtime

### Decision

Node.js 20+

### Reason

Required by the assignment.

---

## HTTP Framework

### Decision

Fastify

### Reason

- High performance
- Excellent TypeScript integration
- Simple routing
- Good plugin ecosystem

---

## Database

### Decision

PostgreSQL

### Reason

- Relational database
- Excellent Prisma support
- Runs easily with Docker Compose
- Reliable and widely adopted

---

## ORM

### Decision

Prisma ORM

### Reason

- Type-safe queries
- Database migrations
- Excellent developer experience
- Automatic client generation

---

## Containerization

### Decision

Docker Compose

### Reason

Required by the assignment.

Used to:

- Start PostgreSQL
- Standardize development environment
- Simplify project execution

---

## Testing Framework

### Decision

Vitest

### Reason

Required by the assignment.

Benefits:

- Fast execution
- Native TypeScript support
- Easy mocking
- Good developer experience

---

## External Integration

### Decision

BrasilAPI

### Endpoint

```
GET /api/feriados/v1/{year}
```

### Reason

Required by the assignment to validate national holidays.

The application must never use hardcoded holidays.

---

## Project Architecture

### Decision

Layered Architecture

```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Prisma
    ↓
PostgreSQL
```

### Reason

Clear separation of responsibilities.

---

## Error Handling

### Decision

Centralized error handling

### Reason

Avoid duplicate code and ensure standardized responses.

---

## Database Access

### Decision

Repository Pattern

### Reason

Repositories isolate persistence from business logic.

---

## Business Rules

### Decision

Business rules stay inside Services.

Examples:

- Passenger validation
- Date validation
- Holiday validation
- Cancellation validation

---

## HTTP Layer

### Decision

Controllers only handle HTTP.

Controllers should:

- Receive requests
- Call services
- Return responses

Controllers should NOT:

- Access the database
- Implement business rules

---

## Response Pattern

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

## Git Convention

### Decision

Use Conventional Commits.

### Examples

```
feat: add trip request creation endpoint

fix: validate passenger count

refactor: centralize error handling

test: add trip request service tests

docs: update project documentation

chore: configure project dependencies
```

---

## Coding Standards

- camelCase for variables and functions
- PascalCase for classes and interfaces
- kebab-case for files and folders
- English for identifiers
- English for commit messages
- English for error messages

---

## Future Refactoring

The following improvements are planned:

- Centralized error middleware
- Validation layer
- BrasilAPI service abstraction
- Automated tests
- API documentation
- Complete README
