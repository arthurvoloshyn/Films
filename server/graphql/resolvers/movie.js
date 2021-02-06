const Directors = require('../models/director');

const getDirectorByIdResolver = ({ directorId }) => Directors.findById(directorId);

module.exports = {
  getDirectorByIdResolver,
};
