const Directors = require('../models/director');

const movieResolver = ({ directorId }) => Directors.findById(directorId);

module.exports = movieResolver;
