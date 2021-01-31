import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { mutationInstance } from '../../utils/utils';
import { deleteMovieMutation } from '../../graphql/mutations';

const withGraphqlDelete = graphql(deleteMovieMutation, {
  props: ({ mutate }) => ({
    deleteMovie: id => mutationInstance(id, mutate),
  }),
});

export default compose(withGraphqlDelete);
