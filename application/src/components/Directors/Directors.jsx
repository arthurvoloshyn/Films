import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { directorsFormElementsList } from '../../constants/directors';
import DirectorsTable from '../DirectorsTable/DirectorsTable';
import Form from '../Form/Form';

import withHocs from './DirectorsHoc';

class Directors extends Component {
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
    const { classes, addDirector, updateDirector } = this.props;

    const formElementsList = directorsFormElementsList(name, age);

    return (
      <>
        <Form
          formElementsList={formElementsList}
          handleAdd={addDirector}
          handleChange={this.handleChange}
          handleUpdate={updateDirector}
          onClose={this.handleClose}
          open={open}
          selectedValue={{ id, name, age: +age }}
          title="Director information"
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

Directors.propTypes = {
  classes: PropTypes.object.isRequired,
  addDirector: PropTypes.func.isRequired,
  updateDirector: PropTypes.func.isRequired,
};

export default withHocs(Directors);
