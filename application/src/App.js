import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import theme from './components/theme';
import Tabs from './components/Tabs/Tabs';

const {
  REACT_APP_SERVER_URL: SERVER_URL,
  REACT_APP_SERVER_PORT: SERVER_PORT,
  REACT_APP_GRAPHQL_REQUEST: GRAPHQL_REQUEST,
} = process.env;

const client = new ApolloClient({
  uri: `${SERVER_URL}:${SERVER_PORT}/${GRAPHQL_REQUEST}`,
});

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Tabs />
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
