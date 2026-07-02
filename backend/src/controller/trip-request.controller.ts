import type { FastifyReply, FastifyRequest } from "fastify";
import { TripRequestService } from "../services/trip-request.service";

export class TripRequestController {
  private service = new TripRequestService();

  async list(request: FastifyRequest, reply: FastifyReply) {
    const tripRequests = await this.service.list();

    return reply.status(200).send({
      success: true,
      data: tripRequests,
    });
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const tripRequest = await this.service.findById(id);

    return reply.status(200).send({
      success: true,
      data: tripRequest,
    });
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const tripRequest = await this.service.create(request.body as Record<string, unknown>);

    return reply.status(201).send({
      success: true,
      data: tripRequest,
    });
  }

  async cancel(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const tripRequest = await this.service.cancel(id);

    return reply.status(200).send({
      success: true,
      data: tripRequest,
    });
  }
}
