import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import { directorsQuery } from '../DirectorsTable/queries';
import { moviesQuery } from '../MoviesTable/queries';
import { addMovieMutation, updateMovieMutation } from './mutations';
import { directorsQuery as directorsNameQuery } from './queries';

import styles from './styles';

const moviesFormMutationInstance = (movie, mutate) =>
  mutate({
    variables: movie,
    refetchQueries: [
      { query: moviesQuery, variables: { name: '' } },
      { query: directorsQuery, variables: { name: '' } },
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
  graphql(directorsNameQuery, {
    options: ({ name = '' }) => ({
      variables: { name },
    }),
  }),
);

export default compose(withStyles(styles), withGraphQL);
