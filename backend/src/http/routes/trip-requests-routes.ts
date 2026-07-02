import type { FastifyInstance } from "fastify";
import { parseCreateTripRequestInput } from "../schemas/trip-request-schemas";
import { TripRequestService } from "../../services/trip-request.service";
import { successResponse } from "../responses";

export function registerTripRequestsRoutes(app: FastifyInstance) {
  const service = new TripRequestService();

  app.post("/trip-requests", async (request, reply) => {
    const input = parseCreateTripRequestInput(request.body);
    const tripRequest = await service.create(input);

    return reply.status(201).send(successResponse(tripRequest));
  });

  app.get("/trip-requests", async (_request, reply) => {
    const tripRequests = await service.list();

    return reply.status(200).send(successResponse(tripRequests));
  });

  app.get("/trip-requests/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const tripRequest = await service.findById(id);

    return reply.status(200).send(successResponse(tripRequest));
  });

  app.patch("/trip-requests/:id/cancel", async (request, reply) => {
    const { id } = request.params as { id: string };
    const tripRequest = await service.cancel(id);

    return reply.status(200).send(successResponse(tripRequest));
  });
}
