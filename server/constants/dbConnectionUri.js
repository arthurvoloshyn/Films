const { dbName, dbUser, dbPass, dbCluster } = require('./environment');
const {
  dbProtocol,
  dbDomain,
  retryWritesParam,
  retryWritesValue,
  writeParam,
  writeValue,
} = require('../constants/dbPaths');

const BASE_PATH = `${dbProtocol}://${dbUser}:${dbPass}@${dbCluster}.${dbDomain}/${dbName}`;
const PARAMS = `${retryWritesParam}${retryWritesValue}&${writeParam}${writeValue}`;

const dbConnectionUri = `${BASE_PATH}?${PARAMS}`;

module.exports = dbConnectionUri;
