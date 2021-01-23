import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { moviesQuery } from '../MoviesTable/queries';
import { directorsQuery } from '../DirectorsTable/queries';
import { addDirectorMutation, updateDirectorMutation } from './mutations';

import { styles } from './styles';

const withGraphQL = compose(
    graphql(addDirectorMutation, {
        props: ({ mutate }) => ({
            addDirector: director => mutate({
                variables: director,
                refetchQueries: [
                    { query: directorsQuery, variables: { name: '' } },
                    { query: moviesQuery, variables: { name: '' } },
                ],
            }),
        }),
    }),
    graphql(updateDirectorMutation, {
        props: ({ mutate }) => ({
            updateDirector: director => mutate({
                variables: director,
                refetchQueries: [
                    { query: directorsQuery, variables: { name: '' } },
                    { query: moviesQuery, variables: { name: '' } },
                ],
            }),
        }),
    }),
);

export default compose(withStyles(styles), withGraphQL);
