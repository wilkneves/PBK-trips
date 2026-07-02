import { describe, expect, it } from "vitest";
import { app } from "../src/app";
import { mockHolidaysApi, mockHolidaysApiUnavailable } from "./helpers/holidays-mock";

describe("GET /holidays/:year", () => {
  it("returns national holidays obtained from the BrasilAPI for the given year", async () => {
    mockHolidaysApi({
      2026: [{ date: "2026-01-01", name: "Confraternização Universal", type: "national" }],
    });

    const response = await app.inject({ method: "GET", url: "/holidays/2026" });

    expect(response.statusCode).toBe(200);
    expect(response.json().data).toEqual([
      { date: "2026-01-01", name: "Confraternização Universal", type: "national" },
    ]);
  });

  it("returns HOLIDAYS_API_UNAVAILABLE when the external API cannot be reached", async () => {
    mockHolidaysApiUnavailable();

    const response = await app.inject({ method: "GET", url: "/holidays/2026" });

    expect(response.statusCode).toBe(502);
    expect(response.json().error.code).toBe("HOLIDAYS_API_UNAVAILABLE");
  });

  it("rejects a non-numeric year", async () => {
    const response = await app.inject({ method: "GET", url: "/holidays/abcd" });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("VALIDATION_ERROR");
  });
});
