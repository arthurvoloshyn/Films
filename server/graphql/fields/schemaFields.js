const {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

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
      type: GraphQLFloat,
    },
  },
  director: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    age: {
      type: new GraphQLNonNull(GraphQLFloat),
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
