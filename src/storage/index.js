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
    return _.cloneDeep(this.repository).sort((a, b) => {
      if (a.arrivalDate !== b.arrivalDate) {
        return a.arrivalDate - b.arrivalDate;
      } else if (a.hotelName !== b.hotelName) {
        const lowA = a.hotelName.toLowerCase();
        const lowB = b.hotelName.toLowerCase();

        if (lowA < lowB) {
          return -1;
        }

        if (lowA > lowB) {
          return 1;
        }
      } else if (a.name !== b.name) {
        const lowA = a.name.toLowerCase();
        const lowB = b.name.toLowerCase();

        if (lowA < lowB) {
          return -1;
        }

        if (lowA > lowB) {
          return 1;
        }
      } else if (a.departureDate !== b.departureDate) {
        return a.departureDate - b.departureDate;
      } else if (a.id !== b.id) {
        const lowA = a.id.toLowerCase();
        const lowB = b.id.toLowerCase();

        if (lowA < lowB) {
          return -1;
        }

        if (lowA > lowB) {
          return 1;
        }
      }

      return 0;
    });
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
