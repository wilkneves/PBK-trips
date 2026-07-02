import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./test/setup.ts"],
    hookTimeout: 20000,
    testTimeout: 20000,
    fileParallelism: false,
  },
});
