import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import { mutationInstance, queryInstance } from '../../utils/utils';
import { directorsQuery } from '../../graphql/queries';
import { addMovieMutation, updateMovieMutation } from '../../graphql/mutations';
import styles from './styles';

const withGraphQL = compose(
  graphql(addMovieMutation, {
    props: ({ mutate }) => ({
      addMovie: movie => mutationInstance(movie, mutate),
    }),
  }),
  graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
      updateMovie: movie => mutationInstance(movie, mutate),
    }),
  }),
  graphql(directorsQuery, queryInstance),
);

export default compose(withStyles(styles), withGraphQL);
