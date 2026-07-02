-- CreateTable
CREATE TABLE "trip_requests" (
    "id" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureAt" TIMESTAMP(3) NOT NULL,
    "returnAt" TIMESTAMP(3) NOT NULL,
    "purpose" TEXT NOT NULL,
    "passengerCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trip_requests_pkey" PRIMARY KEY ("id")
);
