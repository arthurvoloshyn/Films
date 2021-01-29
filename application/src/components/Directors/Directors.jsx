import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DirectorsTable from '../DirectorsTable/DirectorsTable';
import DirectorsForm from '../DirectorsForm/DirectorsForm';

import withHocs from './DirectorsHoc';

class Directors extends React.Component {
  state = {
    open: false,
    name: '',
    age: 0,
  };

  handleClickOpen = data => {
    this.setState({
      ...data,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      name: '',
      age: 0,
      id: null,
      open: false,
    });
  };

  handleChange = name => ({ target }) => {
    this.setState({ [name]: target.value });
  };

  render() {
    const { name, age, id, open } = this.state;
    const { classes } = this.props;

    return (
      <>
        <DirectorsForm
          handleChange={this.handleChange}
          onClose={this.handleClose}
          open={open}
          selectedValue={{ name, age, id }}
        />
        <div className={classes.wrapper}>
          <DirectorsTable onClose={this.handleClose} onOpen={this.handleClickOpen} />
          <Fab
            aria-label="Add"
            className={classes.fab}
            color="primary"
            onClick={() => this.handleClickOpen(null)}
          >
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
}

export default withHocs(Directors);
