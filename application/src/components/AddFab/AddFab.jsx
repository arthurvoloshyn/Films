import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import withHocs from './AddFabHoc';

const AddFab = ({ classes, handleClickOpen }) => {
  const handleClick = () => handleClickOpen();

  return (
    <Fab aria-label="Add" className={classes.fab} color="primary" onClick={handleClick}>
      <AddIcon />
    </Fab>
  );
};

AddFab.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func,
};

AddFab.defaultProps = {
  handleClickOpen: () => {},
};

export default withHocs(AddFab);
