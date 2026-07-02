import { prisma } from "../database/prisma";
import type { CreateTripRequestInput, TripRequest } from "../domain/trip-request";

export class TripRequestRepository {
  async findAll(): Promise<TripRequest[]> {
    return prisma.tripRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<TripRequest | null> {
    return prisma.tripRequest.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateTripRequestInput): Promise<TripRequest> {
    return prisma.tripRequest.create({ data });
  }

  async updateStatus(id: string, status: string): Promise<TripRequest> {
    return prisma.tripRequest.update({
      where: { id },
      data: { status },
    });
  }
}
