import { TripRequestRepository } from "../repositories/trip-request.repository";

export class TripRequestService {
  private repository = new TripRequestRepository();

  async list() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    return this.repository.findById(id);
    }
}