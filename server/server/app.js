const express = require('express');
const path = require('path');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { connect: mongooseConnect, connection: dbConnection } = require('mongoose');

const { serverPort, graphqlRequest, isProd } = require('../constants/environment');
const dbConnectionUri = require('../constants/dbConnectionUri');
const schema = require('../graphql/schema/schema');

const app = express();
const PORT = serverPort || 3005;

const applicationBuildPath = '../../application/build';

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

if (isProd) {
  app.use(express.static(path.resolve(__dirname, applicationBuildPath)));

  app.get('*', (_, res) =>
    res.sendFile(path.resolve(__dirname, `${applicationBuildPath}/index.html`)),
  );
}

/* eslint-disable no-console */
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`Server is running on port ${PORT}!`),
);
/* eslint-enable */
