import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import withHocs from './TabContainerHoc';

const TabContainer = ({ children, dir, classes }) => (
  <Typography className={classes.root} component="div" dir={dir}>
    {children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dir: PropTypes.string,
};

TabContainer.defaultProps = {
  dir: 'ltr',
};

export default withHocs(TabContainer);
