import { gql } from 'apollo-boost';

export const directorsNameQuery = gql`
    query directorsNameQuery($name: String) {
        directors(name: $name) {
            id
            name
        }
    }
`;
