import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { directorsWithMoviesQuery } from '../../graphql/queries';
import { styles } from './styles';

const withGraphQL = graphql(directorsWithMoviesQuery, {
  options: ({ name = '' }) => ({
    variables: { name },
  }),
});

export default compose(withStyles(styles), withGraphQL);
