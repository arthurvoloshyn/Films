import { directorsWithMoviesQuery, moviesQuery } from '../graphql/queries';

export const getMutationInstance = (variables, mutate) =>
  mutate({
    variables,
    refetchQueries: [
      { query: moviesQuery, variables: { name: '' } },
      { query: directorsWithMoviesQuery, variables: { name: '' } },
    ],
  });

export const getQueryInstance = {
  options: ({ name = '' }) => ({
    variables: { name },
  }),
};

export const fetchMoreParamsInstance = variables => ({
  variables,
  updateQuery: (_, { fetchMoreResult }) => fetchMoreResult,
});
