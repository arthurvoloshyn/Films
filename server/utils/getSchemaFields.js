const { schemaFields } = require('../constants/schemaFields');

const getSchemaFields = (fields, { withId, withDirectorId } = {}) => {
  const fieldsOptionsWithId = withId && { ...schemaFields.fieldId };
  const fieldsOptionsWithDirectorId = withDirectorId && { ...schemaFields.fieldDirectorId };

  return {
    ...fieldsOptionsWithId,
    ...fieldsOptionsWithDirectorId,
    ...fields,
  };
};

module.exports = getSchemaFields;
