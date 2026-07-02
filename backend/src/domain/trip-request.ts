import type { TripRequest as PrismaTripRequest } from "@prisma/client";

export type TripRequest = PrismaTripRequest;

export interface CreateTripRequestInput {
  requesterName: string;
  origin: string;
  destination: string;
  departureAt: Date;
  returnAt: Date;
  purpose: string;
  passengerCount: number;
}
