import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import theme from './components/theme';
import Tabs from './components/Tabs/Tabs';

const { SERVER_URL, SERVER_PORT, GRAPHQL_REQUEST } = process.env;

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
