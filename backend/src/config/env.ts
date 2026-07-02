import "dotenv/config";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? "",
  holidaysApiBaseUrl: process.env.HOLIDAYS_API_BASE_URL ?? "",
};
