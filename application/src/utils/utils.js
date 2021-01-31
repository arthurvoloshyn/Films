import { directorsWithMoviesQuery, moviesQuery } from '../graphql/queries';

// eslint-disable-next-line import/prefer-default-export
export const mutationInstance = (variables, mutate) =>
  mutate({
    variables,
    refetchQueries: [
      { query: moviesQuery, variables: { name: '' } },
      { query: directorsWithMoviesQuery, variables: { name: '' } },
    ],
  });
