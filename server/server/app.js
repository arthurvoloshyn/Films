const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { connect: mongooseConnect, connection: dbConnection } = require('mongoose');

const { serverPort, graphqlRequest } = require('../constants/environment');
const dbConnectionUri = require('../constants/dbConnectionUri');
const schema = require('../schema/schema');

const app = express();
const PORT = serverPort || 3005;

/* eslint-disable no-console */
mongooseConnect(dbConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors());

app.use(
  `/${graphqlRequest}`,
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
