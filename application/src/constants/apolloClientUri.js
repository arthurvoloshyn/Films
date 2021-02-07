import env from './environment';

const { serverHost, graphqlRequest } = env;

const apolloClientUri = `${serverHost}/${graphqlRequest}`;

export default apolloClientUri;
