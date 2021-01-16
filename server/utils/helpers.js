const helpers = {
    getArrayItemById: (array, itemId) => array.find(({ id }) => id == itemId),
};

module.exports = helpers;
