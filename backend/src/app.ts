import Fastify from "fastify";
import { errorHandler } from "./errors/error-handler";
import { holidayRoutes } from "./routes/holiday.routes";
import { tripRequestRoutes } from "./routes/trip-request.routes";

export const app = Fastify();

app.setErrorHandler(errorHandler);

app.setNotFoundHandler((request, reply) => {
  return reply.status(404).send({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Route ${request.method} ${request.url} not found`,
    },
  });
});

app.get("/health", async () => {
  return {
    success: true,
    data: {
      status: "ok",
    },
  };
});

app.register(tripRequestRoutes);
app.register(holidayRoutes);