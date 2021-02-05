import env from './environment';

const { serverUrl, serverPort, graphqlRequest } = env;

const apolloClientUri = `${serverUrl}:${serverPort}/${graphqlRequest}`;

export default apolloClientUri;
