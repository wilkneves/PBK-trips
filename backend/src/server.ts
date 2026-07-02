import { app } from "./app";
import { env } from "./config/env";

app.listen({ port: env.port, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port ${env.port}`);
});
