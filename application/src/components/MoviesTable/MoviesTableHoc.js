import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import { mutationInstance, queryInstance } from '../../utils/utils';
import { moviesQuery } from '../../graphql/queries';
import { deleteMovieMutation } from '../../graphql/mutations';
import styles from './styles';

const withGraphQL = compose(
  graphql(moviesQuery, queryInstance),
  graphql(deleteMovieMutation, {
    props: ({ mutate }) => ({
      deleteMovie: id => mutationInstance({ id }, mutate),
    }),
  }),
);

export default compose(withStyles(styles), withGraphQL);
