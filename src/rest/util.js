// @flow

import moment from 'moment';
import type { UnbookedReservation } from '../common/types';
import { RestApiError } from './types';

export function parsePostReservationBody(body: mixed): UnbookedReservation {
  let name, hotelName: string;
  let arrivalDate, departureDate: number;

  if (!body) {
    throw new RestApiError('Invalid json', 400);
  }

  if (typeof body.name === 'string' && body.name) {
    name = body.name;
  } else {
    throw new RestApiError('Invalid reservation name', 400);
  }

  if (typeof body.hotelName === 'string' && body.hotelName) {
    hotelName = body.hotelName;
  } else {
    throw new RestApiError('Invalid reservation hotelName', 400);
  }


  if (typeof body.arrivalDate === 'number' && body.arrivalDate > moment().valueOf()) {
    arrivalDate = body.arrivalDate;
  } else {
    throw new RestApiError('Invalid reservation arrivalDate', 400);
  }


  if (typeof body.departureDate === 'number' && body.departureDate > body.arrivalDate) {
    departureDate = body.departureDate;
  } else {
    throw new RestApiError(`Invalid reservation departureDate`, 400);
  }

  return {
    name,
    hotelName,
    arrivalDate,
    departureDate,
  };
}
