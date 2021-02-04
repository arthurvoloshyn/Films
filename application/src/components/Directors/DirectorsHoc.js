import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { mutationInstance, queryInstance } from '../../utils/utils';
import { directorsWithMoviesQuery } from '../../graphql/queries';
import {
  addDirectorMutation,
  deleteDirectorMutation,
  updateDirectorMutation,
} from '../../graphql/mutations';

const withGraphQL = compose(
  graphql(addDirectorMutation, {
    props: ({ mutate }) => ({
      addDirector: director => mutationInstance(director, mutate),
    }),
  }),
  graphql(updateDirectorMutation, {
    props: ({ mutate }) => ({
      updateDirector: director => mutationInstance(director, mutate),
    }),
  }),
  graphql(deleteDirectorMutation, {
    props: ({ mutate }) => ({
      deleteDirector: id => mutationInstance({ id }, mutate),
    }),
  }),
  graphql(directorsWithMoviesQuery, {
    ...queryInstance,
    name: 'directorsWithMoviesQuery',
  }),
);

export default withGraphQL;
