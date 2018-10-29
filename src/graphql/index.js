// @flow

import fs from 'fs';
import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';
import moment from 'moment';
import express from 'express';
import { getRepository } from '../storage';
import type {
  GetReservationRequest,
  GetReservationResponse,
  GetReservationsResponse,
  PostReservationRequest,
  PostReservationResponse,
} from './types';

const schemaFileContents: string = fs.readFileSync('schema/schema.graphqls', { encoding: 'UTF-8' });
// Construct a schema, using GraphQL schema language
const schema = buildSchema(schemaFileContents);


// The root provides a resolver function for each API endpoint
var root = {
  reservation: (req: GetReservationRequest): GetReservationResponse|void => {
    if (!req.id) {
      throw new Error('Invalid id')
    }

    return getRepository().getReservation(req.id);
  },
  reservations: (): GetReservationsResponse => {
    return getRepository().getAllReservations();
  },
  newReservation: (req: PostReservationRequest): PostReservationResponse => {
    if (!req.newRes.name) {
      throw new Error('Invalid name');
    } else if (!req.newRes.hotelName) {
      throw new Error('Invalid hotelName');
    } else if (req.newRes.arrivalDate <= moment().valueOf()) {
      throw new Error('Can not make reservations in the past');
    } else if (req.newRes.departureDate <= req.newRes.arrivalDate) {
      throw new Error('Departure date can not be before arrival date')
    }

    const id = getRepository().addReservation(req.newRes);
    return { id };
  }
};

export const graphqlRouter = express();
graphqlRouter.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
