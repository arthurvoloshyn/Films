import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { getMutationInstance, getQueryInstance } from '../../../utils/graphql';
import { directorsWithMoviesQuery } from '../../../graphql/queries';
import {
  addDirectorMutation,
  deleteDirectorMutation,
  updateDirectorMutation,
} from '../../../graphql/mutations';

const withGraphQL = compose(
  graphql(addDirectorMutation, {
    props: ({ mutate }) => ({
      addDirector: director => getMutationInstance(director, mutate),
    }),
  }),
  graphql(updateDirectorMutation, {
    props: ({ mutate }) => ({
      updateDirector: director => getMutationInstance(director, mutate),
    }),
  }),
  graphql(deleteDirectorMutation, {
    props: ({ mutate }) => ({
      deleteDirector: id => getMutationInstance({ id }, mutate),
    }),
  }),
  graphql(directorsWithMoviesQuery, {
    ...getQueryInstance,
    name: 'directorsWithMoviesQuery',
  }),
);

export default withGraphQL;
