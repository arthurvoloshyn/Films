const { GraphQLList } = require('graphql');

const schemaFields = require('../fields/schemaFields');
const { searchByNameResolver, findByIdResolver } = require('../resolvers');

const getQueryInstance = {
  collection: (Schema, Model) => ({
    type: new GraphQLList(Schema),
    args: schemaFields.fieldName,
    resolve: searchByNameResolver(Model),
  }),
  element: (Schema, Model) => ({
    type: Schema,
    args: schemaFields.fieldId,
    resolve: findByIdResolver(Model),
  }),
};

module.exports = getQueryInstance;
