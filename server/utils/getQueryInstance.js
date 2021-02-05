const { GraphQLList } = require('graphql');

const schemaFields = require('../constants/schemaFields');
const { findResolver, findByIdResolver } = require('../resolvers');

const getQueryInstance = {
  collection: (Schema, Model) => ({
    type: new GraphQLList(Schema),
    args: schemaFields.fieldName,
    resolve: findResolver(Model),
  }),
  element: (Schema, Model) => ({
    type: Schema,
    args: schemaFields.fieldId,
    resolve: findByIdResolver(Model),
  }),
};

module.exports = getQueryInstance;
