import { prisma } from "../database/prisma";

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
}

