import type { FastifyInstance } from "fastify";
import { TripRequestController } from "../controller/trip-request.controller";

export async function tripRequestRoutes(app: FastifyInstance) {
  const controller = new TripRequestController();

  app.post("/trip-requests", controller.create.bind(controller));
  app.get("/trip-requests", controller.list.bind(controller));
  app.get("/trip-requests/:id", controller.findById.bind(controller));
  app.patch("/trip-requests/:id/cancel", controller.cancel.bind(controller));
}
