import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import env from './constants/environment';
import theme from './components/theme';
import Tabs from './components/Tabs/Tabs';

const { serverUrl, serverPort, graphqlRequest } = env;

const client = new ApolloClient({
  uri: `${serverUrl}:${serverPort}/${graphqlRequest}`,
});

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Tabs />
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
