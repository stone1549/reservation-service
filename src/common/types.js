// @flow

export type Reservation = {
  name: string,
  id: string,
  hotelName: string,
  arrivalDate: number,
  departureDate: number,
};

export type ReservationId = {
  id: string,
}

export type UnbookedReservation = {
  name: string,
  hotelName: string,
  arrivalDate: number,
  departureDate: number,
};
