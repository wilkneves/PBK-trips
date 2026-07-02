import { AppError } from "../errors/app-error";
import { TripRequestRepository } from "../repositories/trip-request.repository";
import { requireIsoDate, requireNonEmptyString, requirePositiveInteger, toDateOnly } from "../utils/validation";
import { HolidayService } from "./holiday.service";

interface CreateTripRequestInput {
  requesterName?: unknown;
  origin?: unknown;
  destination?: unknown;
  departureAt?: unknown;
  returnAt?: unknown;
  purpose?: unknown;
  passengerCount?: unknown;
}

export class TripRequestService {
  private repository = new TripRequestRepository();
  private holidayService = new HolidayService();

  async list() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const tripRequest = await this.repository.findById(id);

    if (!tripRequest) {
      throw new AppError("TRIP_REQUEST_NOT_FOUND", "Trip request not found");
    }

    return tripRequest;
  }

  async create(input: CreateTripRequestInput) {
    const requesterName = requireNonEmptyString(input.requesterName, "requesterName");
    const origin = requireNonEmptyString(input.origin, "origin");
    const destination = requireNonEmptyString(input.destination, "destination");
    const purpose = requireNonEmptyString(input.purpose, "purpose");
    const passengerCount = requirePositiveInteger(input.passengerCount, "passengerCount");

    const departureAt = requireIsoDate(input.departureAt, "departureAt");
    const returnAt = requireIsoDate(input.returnAt, "returnAt");

    if (returnAt.getTime() < departureAt.getTime()) {
      throw new AppError("VALIDATION_ERROR", "returnAt must be greater than or equal to departureAt");
    }

    const departureDateOnly = toDateOnly(departureAt);
    const isHoliday = await this.holidayService.isNationalHoliday(departureDateOnly);

    if (isHoliday) {
      throw new AppError("HOLIDAY_TRIP_NOT_ALLOWED", "Trip requests cannot start on a national holiday");
    }

    return this.repository.create({
      requesterName,
      origin,
      destination,
      purpose,
      passengerCount,
      departureAt,
      returnAt,
    });
  }

  async cancel(id: string) {
    const tripRequest = await this.repository.findById(id);

    if (!tripRequest) {
      throw new AppError("TRIP_REQUEST_NOT_FOUND", "Trip request not found");
    }

    if (tripRequest.status === "canceled") {
      throw new AppError("TRIP_REQUEST_ALREADY_CANCELED", "Trip request is already canceled");
    }

    return this.repository.updateStatus(id, "canceled");
  }
}
