const { GraphQLObjectType, GraphQLSchema, GraphQLList } = require('graphql');

const schemaFields = require('../constants/schemaFields');
const Movies = require('../models/movie');
const Directors = require('../models/director');
const { movieResolver, directorResolver } = require('../resolvers');
const getSchemaFields = require('../utils/getSchemaFields');
const getQueryInstance = require('../utils/getQueryInstance');
const getMutationInstance = require('../utils/getMutationInstance');

/* eslint-disable no-use-before-define */
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    ...getSchemaFields(schemaFields.movie, { withId: true }),
    director: {
      type: DirectorType,
      resolve: movieResolver,
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    ...getSchemaFields(schemaFields.director, { withId: true }),
    movies: {
      type: new GraphQLList(MovieType),
      resolve: directorResolver,
    },
  }),
});
/* eslint-enable */

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: getMutationInstance.add(
      DirectorType,
      Directors,
      getSchemaFields(schemaFields.director),
    ),
    addMovie: getMutationInstance.add(
      MovieType,
      Movies,
      getSchemaFields(schemaFields.movie, { withDirectorId: true }),
    ),
    deleteDirector: getMutationInstance.delete(DirectorType, Directors),
    deleteMovie: getMutationInstance.delete(MovieType, Movies),
    updateDirector: getMutationInstance.update(
      DirectorType,
      Directors,
      getSchemaFields(schemaFields.director, { withId: true }),
    ),
    updateMovie: getMutationInstance.update(
      MovieType,
      Movies,
      getSchemaFields(schemaFields.movie, { withId: true, withDirectorId: true }),
    ),
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: getQueryInstance.element(MovieType, Movies),
    director: getQueryInstance.element(DirectorType, Directors),
    movies: getQueryInstance.collection(MovieType, Movies),
    directors: getQueryInstance.collection(DirectorType, Directors),
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
