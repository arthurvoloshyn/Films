const { GraphQLID } = require('graphql');

const getSchemaFields = (fields, withId) => {
  const fieldOptions = withId && { id: { type: GraphQLID } };

  return {
    ...fieldOptions,
    ...fields,
  };
};

module.exports = getSchemaFields;
