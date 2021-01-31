import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { directorsWithMoviesQuery, moviesQuery } from '../../graphql/queries';
import { deleteMovieMutation } from '../../graphql/mutations';

const withGraphqlDelete = graphql(deleteMovieMutation, {
  props: ({ mutate }) => ({
    deleteMovie: id =>
      mutate({
        variables: id,
        refetchQueries: [
          { query: moviesQuery, variables: { name: '' } },
          { query: directorsWithMoviesQuery, variables: { name: '' } },
        ],
      }),
  }),
});

export default compose(withGraphqlDelete);
