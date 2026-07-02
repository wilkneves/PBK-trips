import type { FastifyInstance } from "fastify";
import { TripRequestController } from "../controller/trip-request.controller";

export async function tripRequestRoutes(app: FastifyInstance) {
  const controller = new TripRequestController();

  app.get("/trip-requests", controller.list.bind(controller));
  app.get("/trip-requests/:id", controller.findById.bind(controller));
  
}