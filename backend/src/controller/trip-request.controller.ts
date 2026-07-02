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

      if (!tripRequest) {
        return reply.status(404).send({
          success: false,
          error: {
            code: "TRIP_REQUEST_NOT_FOUND",
            message: "Trip request not found",
          },
        });
      }

      return reply.status(200).send({
        success: true,
        data: tripRequest,
      });
    }
}