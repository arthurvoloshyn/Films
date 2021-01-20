import React, { Component } from 'react';
import Tabs from './components/Tabs/Tabs';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Tabs />
      </MuiThemeProvider>
    );
  }
}

export default App;
