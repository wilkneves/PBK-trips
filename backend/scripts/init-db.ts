import { prisma } from "../src/database/prisma";

async function main() {
  await prisma.tripRequest.deleteMany();

  await prisma.tripRequest.createMany({
    data: [
      {
        requesterName: "Maria Silva",
        origin: "Parnaíba",
        destination: "Teresina",
        departureAt: new Date("2026-08-10T08:00:00.000Z"),
        returnAt: new Date("2026-08-12T18:00:00.000Z"),
        purpose: "Academic event",
        passengerCount: 2,
      },
      {
        requesterName: "João Santos",
        origin: "Parnaíba",
        destination: "Fortaleza",
        departureAt: new Date("2026-08-15T08:00:00.000Z"),
        returnAt: new Date("2026-08-18T18:00:00.000Z"),
        purpose: "Research meeting",
        passengerCount: 3,
      },
      {
        requesterName: "Ana Costa",
        origin: "Teresina",
        destination: "São Luís",
        departureAt: new Date("2026-09-01T09:00:00.000Z"),
        returnAt: new Date("2026-09-03T17:00:00.000Z"),
        purpose: "Extension project",
        passengerCount: 4,
      },
      {
        requesterName: "Carlos Lima",
        origin: "Parnaíba",
        destination: "Brasília",
        departureAt: new Date("2026-09-10T06:00:00.000Z"),
        returnAt: new Date("2026-09-15T20:00:00.000Z"),
        purpose: "Institutional meeting",
        passengerCount: 1,
      },
      {
        requesterName: "Fernanda Alves",
        origin: "Parnaíba",
        destination: "Recife",
        departureAt: new Date("2026-10-05T07:30:00.000Z"),
        returnAt: new Date("2026-10-08T18:30:00.000Z"),
        purpose: "Conference",
        passengerCount: 2,
      },
      {
        requesterName: "Lucas Rocha",
        origin: "Teresina",
        destination: "Salvador",
        departureAt: new Date("2026-10-12T08:00:00.000Z"),
        returnAt: new Date("2026-10-16T19:00:00.000Z"),
        purpose: "Training",
        passengerCount: 5,
      },
      {
        requesterName: "Juliana Souza",
        origin: "Parnaíba",
        destination: "Belém",
        departureAt: new Date("2026-11-02T08:00:00.000Z"),
        returnAt: new Date("2026-11-05T18:00:00.000Z"),
        purpose: "Workshop",
        passengerCount: 2,
      },
      {
        requesterName: "Rafael Mendes",
        origin: "Parnaíba",
        destination: "Natal",
        departureAt: new Date("2026-11-11T08:00:00.000Z"),
        returnAt: new Date("2026-11-13T18:00:00.000Z"),
        purpose: "Administrative travel",
        passengerCount: 3,
      },
      {
        requesterName: "Patrícia Gomes",
        origin: "Parnaíba",
        destination: "Maceió",
        departureAt: new Date("2026-11-20T08:00:00.000Z"),
        returnAt: new Date("2026-11-22T18:00:00.000Z"),
        purpose: "Technical visit",
        passengerCount: 2,
      },
      {
        requesterName: "Eduardo Oliveira",
        origin: "Parnaíba",
        destination: "João Pessoa",
        departureAt: new Date("2026-12-01T08:00:00.000Z"),
        returnAt: new Date("2026-12-03T18:00:00.000Z"),
        purpose: "Seminar",
        passengerCount: 1,
      },
    ],
  });

  console.log("Database initialized successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
