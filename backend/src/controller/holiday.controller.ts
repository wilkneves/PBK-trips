import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/app-error";
import { HolidayService } from "../services/holiday.service";

export class HolidayController {
  private service = new HolidayService();

  async getByYear(request: FastifyRequest, reply: FastifyReply) {
    const { year } = request.params as { year: string };
    const yearNumber = Number(year);

    if (!Number.isInteger(yearNumber) || String(yearNumber) !== year) {
      throw new AppError("VALIDATION_ERROR", "Year must be a valid integer, e.g. 2026");
    }

    const holidays = await this.service.getByYear(yearNumber);

    return reply.status(200).send({
      success: true,
      data: holidays,
    });
  }
}
