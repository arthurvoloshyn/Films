import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import withHocs from './AddFabHoc';

const AddFab = ({ classes, handleClickOpen }) => (
  <Fab aria-label="Add" className={classes.fab} color="primary" onClick={handleClickOpen}>
    <AddIcon />
  </Fab>
);

AddFab.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func,
};

AddFab.defaultProps = {
  handleClickOpen: () => {},
};

export default withHocs(AddFab);
