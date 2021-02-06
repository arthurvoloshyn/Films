const Movies = require('../models/movie');

const getMoviesByDirectorIdResolver = ({ id }) =>
  Movies.find({
    directorId: id,
  });

module.exports = {
  getMoviesByDirectorIdResolver,
};
