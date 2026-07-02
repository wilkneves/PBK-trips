import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    hookTimeout: 20000,
    testTimeout: 20000,
    fileParallelism: false,
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
});
