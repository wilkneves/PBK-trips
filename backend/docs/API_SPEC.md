# API Specification

## Overview

This document defines the REST API contract for the Institutional Trip Requests API.

---

## Base URL

```
http://localhost:3000
```

---

## Response Pattern

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message in English"
  }
}
```

---

## Endpoints

### Health Check

#### `GET /health`

Checks if the API is running.

#### Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

---

### Trip Requests

#### `GET /trip-requests`

Returns all trip requests.

**200 OK**

```json
{
  "success": true,
  "data": []
}
```

---

#### `GET /trip-requests/:id`

Returns a specific trip request.

**200 OK**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "requesterName": "Maria Silva",
    "origin": "Parnaíba",
    "destination": "Teresina",
    "departureAt": "2026-06-24T10:00:00.000Z",
    "returnAt": "2026-06-24T18:00:00.000Z",
    "purpose": "Participation in an institutional meeting",
    "passengerCount": 3,
    "status": "pending",
    "createdAt": "2026-06-20T14:30:00.000Z"
  }
}
```

**404 Not Found**

```json
{
  "success": false,
  "error": {
    "code": "TRIP_REQUEST_NOT_FOUND",
    "message": "Trip request not found"
  }
}
```

---

#### `POST /trip-requests`

Creates a new trip request.

##### Request Body

```json
{
  "requesterName": "Maria Silva",
  "origin": "Parnaíba",
  "destination": "Teresina",
  "departureAt": "2026-06-24T10:00:00.000Z",
  "returnAt": "2026-06-24T18:00:00.000Z",
  "purpose": "Participation in an institutional meeting",
  "passengerCount": 3
}
```

##### Business Rules

- Validate required fields
- Validate ISO 8601 dates
- Normalize dates to UTC
- Validate that the return date is greater than or equal to the departure date
- Validate that the passenger count is greater than zero
- Check BrasilAPI holidays
- Initial status must be `pending`

##### Response

**201 Created**

---

#### `PATCH /trip-requests/:id/cancel`

Cancels a trip request.

##### Business Rules

- Trip request must exist
- Trip request cannot be canceled twice
- Status changes to `canceled`

##### Response

**200 OK**

---

### Holidays

#### `GET /holidays/:year`

Returns Brazilian national holidays.

##### External API

```
GET https://brasilapi.com.br/api/feriados/v1/{year}
```

##### Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2026-01-01",
      "name": "Confraternização Universal",
      "type": "national"
    }
  ]
}
```

---

## Error Codes

| Code | HTTP |
|------|------|
| VALIDATION_ERROR | 400 |
| TRIP_REQUEST_NOT_FOUND | 404 |
| TRIP_REQUEST_ALREADY_CANCELED | 409 |
| HOLIDAY_TRIP_NOT_ALLOWED | 409 |
| HOLIDAYS_API_UNAVAILABLE | 502 |
| INTERNAL_SERVER_ERROR | 500 |
