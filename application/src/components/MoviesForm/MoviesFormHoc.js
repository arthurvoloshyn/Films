import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import { directorsWithMoviesQuery, directorsQuery, moviesQuery } from '../../graphql/queries';
import { addMovieMutation, updateMovieMutation } from '../../graphql/mutations';

import styles from './styles';

const moviesFormMutationInstance = (movie, mutate) =>
  mutate({
    variables: movie,
    refetchQueries: [
      { query: moviesQuery, variables: { name: '' } },
      { query: directorsWithMoviesQuery, variables: { name: '' } },
    ],
  });

const withGraphQL = compose(
  graphql(addMovieMutation, {
    props: ({ mutate }) => ({
      addMovie: movie => moviesFormMutationInstance(movie, mutate),
    }),
  }),
  graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
      updateMovie: movie => moviesFormMutationInstance(movie, mutate),
    }),
  }),
  graphql(directorsQuery, {
    options: ({ name = '' }) => ({
      variables: { name },
    }),
  }),
);

export default compose(withStyles(styles), withGraphQL);
