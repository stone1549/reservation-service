// @flow

import express from 'express';
import type { $Request, $Response, $Application } from 'express';
import { graphqlRouter } from "./graphql";
import { restApiRouter } from "./rest";


const app: $Application = express();

app.use('/', graphqlRouter, restApiRouter);

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
