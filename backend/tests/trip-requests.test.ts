import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";
import { mockHolidaysApi } from "./helpers/holidays-mock";

const validPayload = {
  requesterName: "Maria Silva",
  origin: "Parnaíba",
  destination: "Teresina",
  departureAt: "2026-08-24T10:00:00.000Z",
  returnAt: "2026-08-24T18:00:00.000Z",
  purpose: "Participation in an institutional meeting",
  passengerCount: 3,
};

async function createTripRequest(payload: Record<string, unknown> = validPayload) {
  return app.inject({
    method: "POST",
    url: "/trip-requests",
    payload,
  });
}

describe("POST /trip-requests", () => {
  beforeEach(() => {
    mockHolidaysApi({ 2026: [] });
  });

  it("creates a valid trip request with status pending", async () => {
    const response = await createTripRequest();

    expect(response.statusCode).toBe(201);

    const body = response.json();
    expect(body.success).toBe(true);
    expect(body.data.status).toBe("pending");
    expect(body.data.departureAt).toBe("2026-08-24T10:00:00.000Z");
    expect(body.data.id).toBeDefined();
  });

  it("normalizes non-UTC ISO dates to UTC with a Z suffix before persisting", async () => {
    const response = await createTripRequest({
      ...validPayload,
      departureAt: "2026-08-24T07:00:00-03:00",
    });

    expect(response.statusCode).toBe(201);
    expect(response.json().data.departureAt).toBe("2026-08-24T10:00:00.000Z");
  });

  it("rejects when required fields are missing", async () => {
    const { requesterName: _requesterName, ...incomplete } = validPayload;

    const response = await createTripRequest(incomplete);

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects when returnAt is before departureAt", async () => {
    const response = await createTripRequest({
      ...validPayload,
      returnAt: "2026-08-20T00:00:00.000Z",
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects when passengerCount is not greater than zero", async () => {
    const response = await createTripRequest({ ...validPayload, passengerCount: 0 });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("VALIDATION_ERROR");
  });

  it("blocks creation when departureAt falls on a national holiday", async () => {
    mockHolidaysApi({
      2026: [{ date: "2026-08-24", name: "Test Holiday", type: "national" }],
    });

    const response = await createTripRequest();

    expect(response.statusCode).toBe(409);
    expect(response.json().error.code).toBe("HOLIDAY_TRIP_NOT_ALLOWED");
  });
});

describe("GET /trip-requests", () => {
  beforeEach(() => {
    mockHolidaysApi({ 2026: [] });
  });

  it("returns an empty list when there are no trip requests", async () => {
    const response = await app.inject({ method: "GET", url: "/trip-requests" });

    expect(response.statusCode).toBe(200);
    expect(response.json().data).toEqual([]);
  });

  it("returns created trip requests", async () => {
    await createTripRequest();

    const response = await app.inject({ method: "GET", url: "/trip-requests" });

    expect(response.statusCode).toBe(200);
    expect(response.json().data).toHaveLength(1);
  });
});

describe("GET /trip-requests/:id", () => {
  it("returns 404 for a trip request that does not exist", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/trip-requests/00000000-0000-0000-0000-000000000000",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe("TRIP_REQUEST_NOT_FOUND");
  });
});

describe("PATCH /trip-requests/:id/cancel", () => {
  beforeEach(() => {
    mockHolidaysApi({ 2026: [] });
  });

  it("cancels an existing trip request", async () => {
    const created = (await createTripRequest()).json().data;

    const response = await app.inject({
      method: "PATCH",
      url: `/trip-requests/${created.id}/cancel`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data.status).toBe("canceled");
  });

  it("rejects canceling a trip request that is already canceled", async () => {
    const created = (await createTripRequest()).json().data;

    await app.inject({ method: "PATCH", url: `/trip-requests/${created.id}/cancel` });
    const response = await app.inject({
      method: "PATCH",
      url: `/trip-requests/${created.id}/cancel`,
    });

    expect(response.statusCode).toBe(409);
    expect(response.json().error.code).toBe("TRIP_REQUEST_ALREADY_CANCELED");
  });

  it("returns 404 when canceling a trip request that does not exist", async () => {
    const response = await app.inject({
      method: "PATCH",
      url: "/trip-requests/00000000-0000-0000-0000-000000000000/cancel",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe("TRIP_REQUEST_NOT_FOUND");
  });
});
