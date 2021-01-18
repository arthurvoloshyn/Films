const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = require('graphql');

const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve: ({ directorId }) => Directors.findById(directorId),
        },
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: ({ id }) => Movies.find({ directorId: id }),
        },
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addDirector: {
          type: DirectorType,
          args: {
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
          },
          resolve: (_, { name, age }) => {
              const director = new Directors({ name, age });
              return director.save();
          },
      },
      addMovie: {
          type: MovieType,
          args: {
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            directorId: { type: GraphQLID },
          },
          resolve: (_, { name, genre, directorId }) => {
              const movie = new Movies({ name, genre, directorId });
              return movie.save();
          },
        },
    },
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => Movies.findById(id),
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => Directors.findById(id),
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: () => Movies.find(),
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: () => Directors.find(),
        },
    },
});

module.exports = new GraphQLSchema({
   query: Query,
   mutation: Mutation,
});
