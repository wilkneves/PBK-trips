import { ERROR_STATUS_MAP, type ErrorCode } from "./error-codes";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly statusCode: number;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = ERROR_STATUS_MAP[code];
  }
}
