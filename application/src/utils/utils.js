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

export const isNumber = value => typeof value === 'number' && Number.isFinite(value);

export const isObjectOrNull = value => typeof value === 'object' && !Array.isArray(value);

export const isBoolean = value => typeof value === 'boolean';

export const removeObjPropImmutably = (obj, prop) => {
  const res = { ...obj };
  delete res[prop];
  return res;
};
