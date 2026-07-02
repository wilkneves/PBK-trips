import { prisma } from "../database/prisma";

interface CreateTripRequestData {
  requesterName: string;
  origin: string;
  destination: string;
  departureAt: Date;
  returnAt: Date;
  purpose: string;
  passengerCount: number;
}

export class TripRequestRepository {
  async findAll() {
    return prisma.tripRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.tripRequest.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateTripRequestData) {
    return prisma.tripRequest.create({ data });
  }

  async updateStatus(id: string, status: string) {
    return prisma.tripRequest.update({
      where: { id },
      data: { status },
    });
  }
}
