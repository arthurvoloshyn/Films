import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { moviesQuery } from '../MoviesTable/queries';
import { directorsQuery } from '../DirectorsTable/queries';
import { deleteDirectorMutation } from './mutations';

const withGraphqlDelete = graphql(deleteDirectorMutation, {
    props: ({ mutate }) => ({
        deleteDirector: id => mutate({
            variables: id,
            refetchQueries: [{ query: directorsQuery }, { query: moviesQuery }],
        }),
    }),
});

export default compose(withGraphqlDelete);
