# reservation-service

A simple hotel reservation service made with NodeJS, Express, and GraphQL.

## Rest Endpoints

GET http://localhost:4000/reservation/:id

GET http://localhost:4000/reservations/

POST http://localhost:4000/reservation/

## GraphQL Endpoint

http://localhost:4000/graphql

## Limitations

Service is hardcoded to run on localhost port 4000.

Currently uses a hastily made in memory store for persisting data so:
* Data will not be persisted beyond the life of the process.
* Service can not currently scale beyond a single process because data is not shared between processes.

No logging, no comments, no tests, no metrics, no security.

## Run

```
git clone https://github.com/stone1549/reservation-service.git

cd reservation-service

yarn

yarn start
```
