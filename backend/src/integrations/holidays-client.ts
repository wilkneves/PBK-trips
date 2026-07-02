import { env } from "../config/env";
import { AppError } from "../errors/app-error";

export interface Holiday {
  date: string;
  name: string;
  type: string;
}

export class HolidaysClient {
  async getByYear(year: number): Promise<Holiday[]> {
    if (!env.holidaysApiBaseUrl) {
      throw new AppError("HOLIDAYS_API_UNAVAILABLE", "Holidays API base URL is not configured");
    }

    let response: Response;

    try {
      response = await fetch(`${env.holidaysApiBaseUrl}/api/feriados/v1/${year}`);
    } catch {
      throw new AppError("HOLIDAYS_API_UNAVAILABLE", "Failed to reach the national holidays API");
    }

    if (!response.ok) {
      throw new AppError(
        "HOLIDAYS_API_UNAVAILABLE",
        "The national holidays API returned an unexpected response",
      );
    }

    return (await response.json()) as Holiday[];
  }
}
