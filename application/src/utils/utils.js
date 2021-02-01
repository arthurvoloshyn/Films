import { directorsWithMoviesQuery, moviesQuery } from '../graphql/queries';

export const mutationInstance = (variables, mutate) =>
  mutate({
    variables,
    refetchQueries: [
      { query: moviesQuery, variables: { name: '' } },
      { query: directorsWithMoviesQuery, variables: { name: '' } },
    ],
  });

export const queryInstance = {
  options: ({ name = '' }) => ({
    variables: { name },
  }),
};
