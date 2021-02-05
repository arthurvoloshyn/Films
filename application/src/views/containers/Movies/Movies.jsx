import React from 'react';
import PropTypes from 'prop-types';

import {
  moviesInitState,
  moviesFormElementsList,
  moviesFormCheckbox,
  moviesTableHeadList,
} from '../../../constants/movies';
import NavigationTable from '../../components/NavigationTable/NavigationTable';
import withHocs from './MoviesHoc';

const Movies = ({
  directorsQuery: { directors = [] },
  addMovie,
  updateMovie,
  deleteMovie,
  moviesQuery: { movies = [], fetchMore },
}) => {
  const formProps = {
    handleAdd: addMovie,
    handleUpdate: updateMovie,
    getFormElementsList: moviesFormElementsList,
    getFormCheckbox: moviesFormCheckbox,
    formElementSelectOptions: directors,
    title: 'Movie information',
  };

  const searchTableProps = {
    fetchMore,
    handleDelete: deleteMovie,
    tableBodyList: movies,
    tableHeadList: moviesTableHeadList,
  };

  return (
    <NavigationTable
      formProps={formProps}
      initState={moviesInitState}
      isMovies
      searchTableProps={searchTableProps}
    />
  );
};

Movies.propTypes = {
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
