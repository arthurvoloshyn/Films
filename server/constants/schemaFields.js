const { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLNonNull } = require('graphql');

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
  fieldId: {
    id: { type: GraphQLID },
  },
  fieldDirectorId: {
    directorId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  fieldName: {
    name: {
      type: GraphQLString,
    },
  },
};

module.exports = schemaFields;
