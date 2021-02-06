const addResolver = Model => (_, { id, ...resolveArgs }) => {
  const newModel = new Model(resolveArgs);
  return newModel.save();
};

const deleteByIdResolver = Model => (_, { id }) => Model.findByIdAndRemove(id);

const updateResolver = Model => (_, { id, ...resolveArgs }) =>
  Model.findByIdAndUpdate(
    id,
    {
      $set: resolveArgs,
    },
    {
      new: true,
    },
  );

const searchByNameResolver = Model => (_, { name }) =>
  Model.find({
    name: {
      $regex: name,
      $options: 'i',
    },
  });

const findByIdResolver = Model => (_, { id }) => Model.findById(id);

module.exports = {
  addResolver,
  deleteByIdResolver,
  updateResolver,
  searchByNameResolver,
  findByIdResolver,
};
