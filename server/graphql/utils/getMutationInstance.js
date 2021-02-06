const schemaFields = require('../fields/schemaFields');
const { addResolver, deleteByIdResolver, updateResolver } = require('../resolvers');

const getMutationInstance = {
  add: (Schema, Model, args) => ({
    type: Schema,
    args,
    resolve: addResolver(Model),
  }),
  delete: (Schema, Model) => ({
    type: Schema,
    args: schemaFields.fieldId,
    resolve: deleteByIdResolver(Model),
  }),
  update: (Schema, Model, args) => ({
    type: Schema,
    args,
    resolve: updateResolver(Model),
  }),
};

module.exports = getMutationInstance;
