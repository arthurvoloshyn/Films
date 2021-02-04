import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  moviesInitState,
  moviesFormElementsList,
  moviesFormCheckbox,
  moviesTableHeadList,
} from '../../constants/movies';
import SearchTable from '../SearchTable/SearchTable';
import Form from '../Form/Form';
import AddFab from '../AddFab/AddFab';
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
    const {
      classes,
      directorsQuery: { directors = [] },
      addMovie,
      updateMovie,
      deleteMovie,
      moviesQuery: { movies = [], fetchMore },
    } = this.props;

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
          <SearchTable
            fetchMore={fetchMore}
            handleDelete={deleteMovie}
            onOpen={this.handleClickOpen}
            tableBodyList={movies}
            tableHeadList={moviesTableHeadList}
          />
          <AddFab handleClickOpen={this.handleClickOpen} />
        </div>
      </>
    );
  }
}

Movies.propTypes = {
  classes: PropTypes.object.isRequired,
  directorsQuery: PropTypes.shape({
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    fetchMore: PropTypes.func,
  }).isRequired,
  moviesQuery: PropTypes.shape({
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        genre: PropTypes.string,
        rate: PropTypes.number,
        watched: PropTypes.bool,
        director: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    ),
    fetchMore: PropTypes.func,
  }).isRequired,
  addMovie: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default withHocs(Movies);
