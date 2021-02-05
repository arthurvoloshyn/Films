const Movies = require('../models/movie');

const directorResolver = ({ id }) =>
  Movies.find({
    directorId: id,
  });

module.exports = directorResolver;
