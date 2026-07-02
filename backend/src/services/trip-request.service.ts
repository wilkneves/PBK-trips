import type { CreateTripRequestInput, TripRequest } from "../domain/trip-request";
import { AppError } from "../errors/app-error";
import { TripRequestRepository } from "../repositories/trip-request.repository";
import { HolidayService } from "./holiday.service";

export class TripRequestService {
  private repository = new TripRequestRepository();
  private holidayService = new HolidayService();

  async list(): Promise<TripRequest[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<TripRequest> {
    const tripRequest = await this.repository.findById(id);

    if (!tripRequest) {
      throw new AppError("TRIP_REQUEST_NOT_FOUND");
    }

    return tripRequest;
  }

  async create(input: CreateTripRequestInput): Promise<TripRequest> {
    const departureDateOnly = input.departureAt.toISOString().slice(0, 10);
    const isHoliday = await this.holidayService.isNationalHoliday(departureDateOnly);

    if (isHoliday) {
      throw new AppError("HOLIDAY_TRIP_NOT_ALLOWED");
    }

    return this.repository.create(input);
  }

  async cancel(id: string): Promise<TripRequest> {
    const tripRequest = await this.repository.findById(id);

    if (!tripRequest) {
      throw new AppError("TRIP_REQUEST_NOT_FOUND");
    }

    if (tripRequest.status === "canceled") {
      throw new AppError("TRIP_REQUEST_ALREADY_CANCELED");
    }

    return this.repository.updateStatus(id, "canceled");
  }
}
