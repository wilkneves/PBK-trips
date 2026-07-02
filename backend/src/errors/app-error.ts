import { errorDefinitions, type ErrorCode } from "./error-definitions";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly statusCode: number;

  constructor(code: ErrorCode, message?: string) {
    const definition = errorDefinitions[code];
    super(message ?? definition.message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = definition.statusCode;
  }
}
