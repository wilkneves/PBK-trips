import { AppError } from "../errors/app-error";

export function requireNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError("VALIDATION_ERROR", `${field} is required and must be a non-empty string`);
  }

  return value.trim();
}

export function requirePositiveInteger(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new AppError("VALIDATION_ERROR", `${field} must be an integer greater than zero`);
  }

  return value;
}

export function requireIsoDate(value: unknown, field: string): Date {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError("VALIDATION_ERROR", `${field} is required and must be an ISO 8601 date string`);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new AppError("VALIDATION_ERROR", `${field} must be a valid ISO 8601 date`);
  }

  return date;
}

export function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}
