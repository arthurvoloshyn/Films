import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import MoviesTable from '../MoviesTable/MoviesTable';
import MoviesForm from '../MoviesForm/MoviesForm';
import withHocs from './MoviesHoc';

class Movies extends Component {
  state = {
    open: false,
    name: '',
    genre: '',
    watched: false,
    rate: 0,
    directorId: '',
  };

  handleClickOpen = (data = {}) =>
    this.setState({
      ...data,
      open: true,
      directorId: data.director?.id || '',
    });

  handleClose = () =>
    this.setState({
      name: '',
      genre: '',
      watched: false,
      rate: 0,
      directorId: '',
      id: null,
      open: false,
    });

  handleSelectChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleChange = name => ({ target: { type, value, checked } }) => {
    const val = type === 'checkbox' ? checked : value;

    this.setState({ [name]: val });
  };

  handleAddMovie = () => this.handleClickOpen();

  render() {
    const { id, name, genre, watched, rate, directorId, open } = this.state;
    const { classes } = this.props;

    return (
      <>
        <MoviesForm
          handleChange={this.handleChange}
          handleSelectChange={this.handleSelectChange}
          onClose={this.handleClose}
          open={open}
          selectedValue={{
            id,
            name,
            genre,
            watched,
            rate,
            directorId,
          }}
        />
        <div className={classes.wrapper}>
          <MoviesTable onOpen={this.handleClickOpen} />
          <Fab
            aria-label="Add"
            className={classes.fab}
            color="primary"
            onClick={this.handleAddMovie}
          >
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
}

Movies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withHocs(Movies);
