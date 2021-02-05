const {
  dbProtocol,
  dbDomain,
  retryWritesParam,
  retryWritesValue,
  writeParam,
  writeValue,
} = require('../constants/dbPaths');

const { DB_NAME, DB_USER, DB_PASS, DB_CLUSTER } = process.env;

const BASE_PATH = `${dbProtocol}://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.${dbDomain}/${DB_NAME}`;
const PARAMS = `${retryWritesParam}${retryWritesValue}&${writeParam}${writeValue}`;

const dbConnectionUri = `${BASE_PATH}?${PARAMS}`;

module.exports = dbConnectionUri;
