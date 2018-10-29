// @flow
import express from 'express';
import * as bodyParser from 'body-parser';
import type { $Request, $Response, $Application } from 'express';
import { getRepository } from '../storage';
import type { Reservation, ReservationId } from '../common/types';
import { RestApiError } from './types';
import { parsePostReservationBody } from './util';

export const restApiRouter: $Application = express();
restApiRouter.get('/reservation/:id', (req: $Request, res: $Response) => {
  let statusCode: number = 200;
  let result: Reservation|RestApiError = new RestApiError('Unknown server error', 500);
  return Promise.resolve()
    .then(() => {
      const { id } = req.params;

      if (!id) {
        throw  new RestApiError(`Invalid reservation id: ${id}`, 400);
      }

      const reservation = getRepository().getReservation(id);

      if (!reservation) {
        throw new RestApiError(`Unable to find reservation with id ${id}`, 404);
      }

      result = reservation;
  })
    .catch((err) => {
      if (err instanceof RestApiError) {
        statusCode = err.statusCode;
        result = err;
      } else {
        statusCode = 500;
        result = new RestApiError(`Unknown server error: ${err}`, 500);
      }
    })
    .then(() => {
      res.status(statusCode);
      res.json(result);
    });
});

restApiRouter.post('/reservation/', bodyParser.json(), (req: $Request, res: $Response) => {
  let result: ReservationId|RestApiError = new RestApiError('Unknown server error', 500);
  let statusCode: number = 201;

  return Promise.resolve()
    .then(() => {
      const unbookedReservation = parsePostReservationBody(req.body);

      const id = getRepository().addReservation(unbookedReservation);

      if (!id) {
        statusCode = 500;
        result = new RestApiError('Unable to save reservation', statusCode);
      }

      result = { id };
    })
    .catch((err) => {
      if (err instanceof RestApiError) {
        statusCode = err.statusCode;
        result = err;
      } else {
        statusCode = 500;
        result = new RestApiError(`Unknown server error: ${err}`, 500);
      }
    })
    .then(() => {
      res.status(statusCode);
      res.json(result);
    });
});

restApiRouter.get('/reservations', (req: $Request, res: $Response) => {
  res.status(200);
  res.json(getRepository().getAllReservations());
});
