import "dotenv/config";
import { afterAll, afterEach, vi } from "vitest";
import { prisma } from "../src/database/prisma";

afterEach(async () => {
  await prisma.tripRequest.deleteMany();
  vi.unstubAllGlobals();
});

afterAll(async () => {
  await prisma.$disconnect();
});
