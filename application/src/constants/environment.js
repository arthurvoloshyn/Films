const {
  NODE_ENV,
  REACT_APP_SERVER_URL,
  REACT_APP_SERVER_PORT,
  REACT_APP_GRAPHQL_REQUEST,
} = process.env;

const env = {
  prod: NODE_ENV === 'production',
  dev: NODE_ENV === 'development',
  serverUrl: REACT_APP_SERVER_URL,
  serverPort: REACT_APP_SERVER_PORT,
  graphqlRequest: REACT_APP_GRAPHQL_REQUEST,
};

export default env;
