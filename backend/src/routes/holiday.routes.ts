import type { FastifyInstance } from "fastify";
import { HolidayController } from "../controller/holiday.controller";

export async function holidayRoutes(app: FastifyInstance) {
  const controller = new HolidayController();

  app.get("/holidays/:year", controller.getByYear.bind(controller));
}
