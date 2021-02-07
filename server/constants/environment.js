const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_CLUSTER,
  SERVER_PORT,
  GRAPHQL_REQUEST,
  NODE_ENV,
} = process.env;

const env = {
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPass: DB_PASS,
  dbCluster: DB_CLUSTER,
  serverPort: SERVER_PORT,
  graphqlRequest: GRAPHQL_REQUEST,
  isProd: NODE_ENV === 'production',
};

module.exports = env;
