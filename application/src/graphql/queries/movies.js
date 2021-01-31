import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const moviesQuery = gql`
  query moviesQuery($name: String) {
    movies(name: $name) {
      id
      name
      genre
      watched
      rate
      director {
        id
        name
      }
    }
  }
`;
