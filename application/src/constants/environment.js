const { NODE_ENV, REACT_APP_SERVER_HOST, REACT_APP_GRAPHQL_REQUEST } = process.env;

const env = {
  prod: NODE_ENV === 'production',
  dev: NODE_ENV === 'development',
  serverHost: REACT_APP_SERVER_HOST,
  graphqlRequest: REACT_APP_GRAPHQL_REQUEST,
};

export default env;
