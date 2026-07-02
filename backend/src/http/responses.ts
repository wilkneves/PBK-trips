import type { ErrorCode } from "../errors/error-definitions";

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
  };
}

export function successResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
  };
}

export function errorResponse(code: ErrorCode, message: string): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}
