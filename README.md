# reservation-service

A simple hotel reservation service made with NodeJS, Express, and GraphQL.

## Rest Endpoints

GET http://localhost:4000/reservation/:id

GET http://localhost:4000/reservations/

POST http://localhost:4000/reservation/

## GraphQL Endpoint

http://localhost:4000/graphql

## Limitations

Currently uses an in memory store for persisting data, will only function with a single instance running and data will not be persisted after instance is shutdown. No logging, no tests, no metrics, no security.

## Run
yarn

yarn start
