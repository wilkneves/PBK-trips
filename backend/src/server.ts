import "dotenv/config";
import { app } from "./app";

const port = Number(process.env.PORT ?? 3000);

app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port ${port}`);
});
