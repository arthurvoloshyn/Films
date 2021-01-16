const helpers = {
    getCollectionItemById: (collection, itemId) => collection.find(({ id }) => id === itemId),
    getCollectionItemsByDirectorId: (collection, itemId) => collection.filter(({ directorId }) => directorId === itemId),
};

module.exports = helpers;
