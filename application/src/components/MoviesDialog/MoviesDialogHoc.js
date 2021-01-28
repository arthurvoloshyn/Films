import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { directorsQuery } from '../DirectorsTable/queries';
import { moviesQuery } from '../MoviesTable/queries';
import { deleteMovieMutation } from './mutations';

const withGraphqlDelete = graphql(deleteMovieMutation, {
  props: ({ mutate }) => ({
    deleteMovie: id =>
      mutate({
        variables: id,
        refetchQueries: [
          { query: moviesQuery, variables: { name: '' } },
          { query: directorsQuery, variables: { name: '' } },
        ],
      }),
  }),
});

export default compose(withGraphqlDelete);
