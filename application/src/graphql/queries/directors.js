import { gql } from 'apollo-boost';

export const directorsQuery = gql`
  query directorsQuery($name: String) {
    directors(name: $name) {
      id
      name
    }
  }
`;

export const directorsWithMoviesQuery = gql`
  query directorsWithMoviesQuery($name: String) {
    directors(name: $name) {
      id
      name
      age
      movies {
        id
        name
      }
    }
  }
`;
