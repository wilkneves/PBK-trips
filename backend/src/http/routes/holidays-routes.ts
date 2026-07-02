import type { FastifyInstance } from "fastify";
import { parseYearParam } from "../schemas/trip-request-schemas";
import { HolidayService } from "../../services/holiday.service";
import { successResponse } from "../responses";

export function registerHolidaysRoutes(app: FastifyInstance) {
  const service = new HolidayService();

  app.get("/holidays/:year", async (request, reply) => {
    const { year } = request.params as { year: string };
    const yearNumber = parseYearParam(year);
    const holidays = await service.getByYear(yearNumber);

    return reply.status(200).send(successResponse(holidays));
  });
}
