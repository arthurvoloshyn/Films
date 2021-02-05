import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { mutationInstance, queryInstance } from '../../../utils/utils';
import { directorsQuery, moviesQuery } from '../../../graphql/queries';
import {
  addMovieMutation,
  deleteMovieMutation,
  updateMovieMutation,
} from '../../../graphql/mutations';

const withGraphQL = compose(
  graphql(addMovieMutation, {
    props: ({ mutate }) => ({
      addMovie: movie => mutationInstance(movie, mutate),
    }),
  }),
  graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
      updateMovie: movie => mutationInstance(movie, mutate),
    }),
  }),
  graphql(deleteMovieMutation, {
    props: ({ mutate }) => ({
      deleteMovie: id => mutationInstance({ id }, mutate),
    }),
  }),
  graphql(moviesQuery, {
    ...queryInstance,
    name: 'moviesQuery',
  }),
  graphql(directorsQuery, {
    ...queryInstance,
    name: 'directorsQuery',
  }),
);

export default withGraphQL;
