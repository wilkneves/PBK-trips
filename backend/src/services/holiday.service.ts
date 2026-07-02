import { HolidaysClient, type Holiday } from "../integrations/holidays-client";

export class HolidayService {
  private client = new HolidaysClient();

  async getByYear(year: number): Promise<Holiday[]> {
    return this.client.getByYear(year);
  }

  async isNationalHoliday(dateOnly: string): Promise<boolean> {
    const year = Number(dateOnly.slice(0, 4));
    const holidays = await this.getByYear(year);

    return holidays.some((holiday) => holiday.date === dateOnly);
  }
}
