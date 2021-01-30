import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import CameraIcon from '@material-ui/icons/Camera';

import Movies from '../Movies/Movies';
import Directors from '../Directors/Directors';
import TabContainer from '../TabContainer/TabContainer';

import withHocs from './TabsHoc';

class SimpleTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => this.setState({ value });

  handleChangeIndex = index => this.setState({ value: index });

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs onChange={this.handleChange} value={value} variant="fullWidth">
            <Tab icon={<CameraIcon />} label="Movies" />
            <Tab icon={<MovieCreationIcon />} label="Directors" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Movies />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Directors />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withHocs(SimpleTabs);
