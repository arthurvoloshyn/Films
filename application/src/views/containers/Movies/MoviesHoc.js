import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { getMutationInstance, getQueryInstance } from '../../../utils/graphql';
import { directorsQuery, moviesQuery } from '../../../graphql/queries';
import {
  addMovieMutation,
  deleteMovieMutation,
  updateMovieMutation,
} from '../../../graphql/mutations';

const withGraphQL = compose(
  graphql(addMovieMutation, {
    props: ({ mutate }) => ({
      addMovie: movie => getMutationInstance(movie, mutate),
    }),
  }),
  graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
      updateMovie: movie => getMutationInstance(movie, mutate),
    }),
  }),
  graphql(deleteMovieMutation, {
    props: ({ mutate }) => ({
      deleteMovie: id => getMutationInstance({ id }, mutate),
    }),
  }),
  graphql(moviesQuery, {
    ...getQueryInstance,
    name: 'moviesQuery',
  }),
  graphql(directorsQuery, {
    ...getQueryInstance,
    name: 'directorsQuery',
  }),
);

export default withGraphQL;
