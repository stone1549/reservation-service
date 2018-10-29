// @flow

import type {Reservation, ReservationId, UnbookedReservation} from '../common/types';

export type GetReservationRequest = {
  id: string,
};

export type GetReservationResponse = Reservation;

export type GetReservationsResponse = Array<Reservation>;

export type PostReservationRequest = {
  newRes: UnbookedReservation,
}

export type PostReservationResponse = ReservationId;
