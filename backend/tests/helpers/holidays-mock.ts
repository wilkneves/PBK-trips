import { vi } from "vitest";
import type { Holiday } from "../../src/integrations/holidays-client";

export function mockHolidaysApi(holidaysByYear: Record<number, Holiday[]>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL) => {
      const url = input.toString();
      const match = url.match(/\/api\/feriados\/v1\/(\d+)/);

      if (!match) {
        return new Response("Not Found", { status: 404 });
      }

      const year = Number(match[1]);
      const holidays = holidaysByYear[year] ?? [];

      return new Response(JSON.stringify(holidays), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }),
  );
}

export function mockHolidaysApiUnavailable() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      throw new Error("network error");
    }),
  );
}
