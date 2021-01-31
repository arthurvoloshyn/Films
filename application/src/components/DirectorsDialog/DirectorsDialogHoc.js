import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { moviesQuery, directorsWithMoviesQuery } from '../../graphql/queries';
import { deleteDirectorMutation } from '../../graphql/mutations';

const withGraphqlDelete = graphql(deleteDirectorMutation, {
  props: ({ mutate }) => ({
    deleteDirector: id =>
      mutate({
        variables: id,
        refetchQueries: [
          { query: directorsWithMoviesQuery, variables: { name: '' } },
          { query: moviesQuery, variables: { name: '' } },
        ],
      }),
  }),
});

export default compose(withGraphqlDelete);
