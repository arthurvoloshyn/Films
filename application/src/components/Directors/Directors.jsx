import React from 'react';
import PropTypes from 'prop-types';

import {
  directorsInitState,
  directorsFormElementsList,
  directorsTableHeadList,
} from '../../constants/directors';
import NavigationTable from '../NavigationTable/NavigationTable';
import withHocs from './DirectorsHoc';

const Directors = ({
  directorsWithMoviesQuery: { directors = [], fetchMore },
  addDirector,
  updateDirector,
  deleteDirector,
}) => {
  const formProps = {
    handleAdd: addDirector,
    handleUpdate: updateDirector,
    getFormElementsList: directorsFormElementsList,
    title: 'Movie information',
  };

  const searchTableProps = {
    fetchMore,
    handleDelete: deleteDirector,
    tableBodyList: directors,
    tableHeadList: directorsTableHeadList,
  };

  return (
    <NavigationTable
      formProps={formProps}
      initState={directorsInitState}
      searchTableProps={searchTableProps}
    />
  );
};

Directors.propTypes = {
  addDirector: PropTypes.func.isRequired,
  updateDirector: PropTypes.func.isRequired,
  deleteDirector: PropTypes.func.isRequired,
  directorsWithMoviesQuery: PropTypes.shape({
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        age: PropTypes.number,
        movies: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
          }),
        ),
      }),
    ),
    fetchMore: PropTypes.func,
  }).isRequired,
};

export default withHocs(Directors);
