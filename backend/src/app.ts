import Fastify from "fastify";
import { registerErrorHandler } from "./errors/error-handler";
import { registerHolidaysRoutes } from "./http/routes/holidays-routes";
import { registerTripRequestsRoutes } from "./http/routes/trip-requests-routes";

export const app = Fastify();

registerErrorHandler(app);

app.get("/health", async () => {
  return {
    success: true,
    data: {
      status: "ok",
    },
  };
});

registerTripRequestsRoutes(app);
registerHolidaysRoutes(app);
