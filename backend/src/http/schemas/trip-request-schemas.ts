import type { CreateTripRequestInput } from "../../domain/trip-request";
import { AppError } from "../../errors/app-error";

function requireNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError("VALIDATION_ERROR", `${field} is required and must be a non-empty string`);
  }

  return value.trim();
}

function requirePositiveInteger(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new AppError("VALIDATION_ERROR", `${field} must be an integer greater than zero`);
  }

  return value;
}

function requireIsoDate(value: unknown, field: string): Date {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AppError(
      "VALIDATION_ERROR",
      `${field} is required and must be an ISO 8601 date string`,
    );
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new AppError("VALIDATION_ERROR", `${field} must be a valid ISO 8601 date`);
  }

  return date;
}

export function parseCreateTripRequestInput(body: unknown): CreateTripRequestInput {
  const input = (body ?? {}) as Record<string, unknown>;

  const requesterName = requireNonEmptyString(input.requesterName, "requesterName");
  const origin = requireNonEmptyString(input.origin, "origin");
  const destination = requireNonEmptyString(input.destination, "destination");
  const purpose = requireNonEmptyString(input.purpose, "purpose");
  const passengerCount = requirePositiveInteger(input.passengerCount, "passengerCount");
  const departureAt = requireIsoDate(input.departureAt, "departureAt");
  const returnAt = requireIsoDate(input.returnAt, "returnAt");

  if (returnAt.getTime() < departureAt.getTime()) {
    throw new AppError("VALIDATION_ERROR", "returnAt must be greater than or equal to departureAt");
  }

  return {
    requesterName,
    origin,
    destination,
    purpose,
    passengerCount,
    departureAt,
    returnAt,
  };
}

export function parseYearParam(year: string): number {
  const yearNumber = Number(year);

  if (!Number.isInteger(yearNumber) || String(yearNumber) !== year) {
    throw new AppError("VALIDATION_ERROR", "Year must be a valid integer, e.g. 2026");
  }

  return yearNumber;
}
