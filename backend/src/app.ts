import Fastify from "fastify";
import { tripRequestRoutes } from "./routes/trip-request.routes";

export const app = Fastify();

app.get("/health", async () => {
  return {
    success: true,
    data: {
      status: "ok",
    },
  };
});

app.register(tripRequestRoutes);