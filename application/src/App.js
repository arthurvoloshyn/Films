import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import apolloClientUri from './constants/apolloClientUri';
import theme from './views/components/theme';
import Tabs from './views/components/Tabs/Tabs';

const client = new ApolloClient({
  uri: apolloClientUri,
});

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Tabs />
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
