import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { mutationInstance, queryInstance } from '../../utils/utils';
import { directorsWithMoviesQuery } from '../../graphql/queries';
import { deleteDirectorMutation } from '../../graphql/mutations';
import { styles } from './styles';

const withGraphQL = compose(
  graphql(directorsWithMoviesQuery, queryInstance),
  graphql(deleteDirectorMutation, {
    props: ({ mutate }) => ({
      deleteDirector: id => mutationInstance({ id }, mutate),
    }),
  }),
);

export default compose(withStyles(styles), withGraphQL);
