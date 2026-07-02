import { AppError } from "../errors/app-error";

export interface Holiday {
  date: string;
  name: string;
  type: string;
}

export class HolidaysClient {
  private get baseUrl(): string {
    const baseUrl = process.env.HOLIDAYS_API_BASE_URL;

    if (!baseUrl) {
      throw new AppError("HOLIDAYS_API_UNAVAILABLE", "Holidays API base URL is not configured");
    }

    return baseUrl;
  }

  async getByYear(year: number): Promise<Holiday[]> {
    let response: Response;

    try {
      response = await fetch(`${this.baseUrl}/api/feriados/v1/${year}`);
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
