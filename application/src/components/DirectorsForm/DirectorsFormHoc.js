import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { moviesQuery } from '../MoviesTable/queries';
import { directorsQuery } from '../DirectorsTable/queries';
import { addDirectorMutation } from './mutations';

import { styles } from './styles';

const withGraphqlAdd = graphql(addDirectorMutation, {
    props: ({ mutate }) => ({
        addDirector: director => mutate({
            variables: director,
            refetchQueries: [{ query: directorsQuery }, { query: moviesQuery }],
        }),
    }),
});

export default compose(withStyles(styles), withGraphqlAdd);
