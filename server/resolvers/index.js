const movieResolver = require('./movie');
const directorResolver = require('./director');
const baseResolvers = require('./base');

module.exports = {
  ...baseResolvers,
  movieResolver,
  directorResolver,
};
