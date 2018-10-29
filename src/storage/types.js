// @flow

import type { Reservation } from '../common/types';
import type {UnbookedReservation} from '../common/types';

export interface ReservationRepository {
  addReservation(unbookedRes: UnbookedReservation): string,
  getReservation(id: string): Reservation|void,
  getAllReservations(): Array<Reservation>,
}

export type RepoType = 'IN_MEMORY';

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
  }
}
