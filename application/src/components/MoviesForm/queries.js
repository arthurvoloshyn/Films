import { gql } from 'apollo-boost';

export const directorsNameQuery = gql`
    query directorsNameQuery {
        directors {
            id
            name
        }
    }
`;
