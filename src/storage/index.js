// @flow

import uuid from "uuid/v4";
import _ from "lodash";
import type { Reservation, UnbookedReservation } from "../common/types";
import type { RepoType, ReservationRepository } from "./types";

class InMemoryReservationRepo {
  repository: Array<Reservation> = [];
  addReservation(unbookedRes: UnbookedReservation): string {
    const { name, hotelName, arrivalDate, departureDate } = unbookedRes;
    const newRes: Reservation = {
      id: uuid(),
      name,
      hotelName,
      arrivalDate,
      departureDate,
    };

    this.repository.push(newRes);
    return newRes.id;
  }
  getAllReservations(): Array<Reservation> {
    return _.cloneDeep(this.repository);
  }
  getReservation(id: string): Reservation|void {
    return this.repository.find((res: Reservation) => {
      return res.id === id;
    });
  }
}

let singleRepo: ReservationRepository;
export const getRepository = (repoType: RepoType = 'IN_MEMORY'): ReservationRepository => {
  if (!singleRepo) {
    switch (repoType) {
      case 'IN_MEMORY':
        singleRepo = new InMemoryReservationRepo();
        break;
      default:
        throw `Invalid repository type: ${repoType}`;
    }
  }

  return singleRepo;
};
