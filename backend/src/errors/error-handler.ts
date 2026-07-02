import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./app-error";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: unknown, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    });
  });

  app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(404).send({
      success: false,
      error: {
        code: "ROUTE_NOT_FOUND",
        message: `Route ${request.method} ${request.url} not found`,
      },
    });
  });
}
