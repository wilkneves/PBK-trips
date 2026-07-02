export const errorDefinitions = {
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Request data is invalid",
  },
  TRIP_REQUEST_NOT_FOUND: {
    statusCode: 404,
    message: "Trip request not found",
  },
  ROUTE_NOT_FOUND: {
    statusCode: 404,
    message: "Route not found",
  },
  TRIP_REQUEST_ALREADY_CANCELED: {
    statusCode: 409,
    message: "Trip request is already canceled",
  },
  HOLIDAY_TRIP_NOT_ALLOWED: {
    statusCode: 409,
    message: "Trip requests cannot start on a national holiday",
  },
  HOLIDAYS_API_UNAVAILABLE: {
    statusCode: 502,
    message: "National holidays service is unavailable",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "An unexpected error occurred",
  },
} as const;

export type ErrorCode = keyof typeof errorDefinitions;
