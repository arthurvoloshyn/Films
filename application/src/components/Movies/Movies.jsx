import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
  moviesInitState,
  moviesFormElementsList,
  moviesFormCheckbox,
} from '../../constants/movies';
import MoviesTable from '../MoviesTable/MoviesTable';
import Form from '../Form/Form';
import withHocs from './MoviesHoc';

class Movies extends Component {
  state = moviesInitState;

  handleClickOpen = (data = {}) =>
    this.setState({
      ...data,
      open: true,
      directorId: data.director?.id || '',
    });

  handleClose = () => this.setState(moviesInitState);

  handleChange = name => ({ target: { type, value, checked } }) => {
    const val = type === 'checkbox' ? checked : value;

    this.setState({ [name]: val });
  };

  render() {
    const { id, name, genre, watched, rate, directorId, open } = this.state;
    const { classes, data: { directors = [] } = {}, addMovie, updateMovie } = this.props;

    const formElementsList = moviesFormElementsList(name, genre, rate, { directorId, directors });
    const formCheckbox = moviesFormCheckbox(watched);

    return (
      <>
        <Form
          formCheckbox={formCheckbox}
          formElementsList={formElementsList}
          handleAdd={addMovie}
          handleChange={this.handleChange}
          handleUpdate={updateMovie}
          onClose={this.handleClose}
          open={open}
          selectedValue={{
            id,
            name,
            genre,
            watched: !!watched,
            rate: +rate,
            directorId,
          }}
          title="Movie information"
        />
        <div className={classes.wrapper}>
          <MoviesTable onOpen={this.handleClickOpen} />
          <Fab
            aria-label="Add"
            className={classes.fab}
            color="primary"
            onClick={this.handleClickOpen}
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
  data: PropTypes.shape({
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  addMovie: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired,
};

export default withHocs(Movies);
