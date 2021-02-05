const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');

const { findResolver, findByIdResolver } = require('../resolvers');

const getQueryInstance = {
  collection: (Schema, Model) => ({
    type: new GraphQLList(Schema),
    args: {
      name: {
        type: GraphQLString,
      },
    },
    resolve: findResolver(Model),
  }),
  element: (Schema, Model) => ({
    type: Schema,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: findByIdResolver(Model),
  }),
};

module.exports = getQueryInstance;
