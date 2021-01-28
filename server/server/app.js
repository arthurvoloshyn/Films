const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { connect: mongooseConnect, connection: dbConnection } = require('mongoose');

const {
  retryWritesParam,
  retryWritesValue,
  writeParam,
  writeValue,
} = require('../constants/dbPaths');
const schema = require('../schema/schema');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { SERVER_PORT, DB_NAME, DB_USER, DB_PASS, DB_CLUSTER, GRAPHQL_REQUEST } = process.env;

const app = express();
const PORT = SERVER_PORT || 3005;

/* eslint-disable no-console, max-len */
mongooseConnect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?${retryWritesParam}${retryWritesValue}&${writeParam}${writeValue}`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
);

app.use(cors());

app.use(
  `/${GRAPHQL_REQUEST}`,
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`Server is running on port ${PORT}!`),
);
/* eslint-enable */
