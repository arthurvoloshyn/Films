const { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLNonNull } = require('graphql');

const schemaFields = {
  movie: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    genre: {
      type: new GraphQLNonNull(GraphQLString),
    },
    watched: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    rate: {
      type: GraphQLInt,
    },
  },
  director: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
};

module.exports = schemaFields;
