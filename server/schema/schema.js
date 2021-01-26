const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
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
            name: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: new GraphQLNonNull(GraphQLInt) },
          },
          resolve: (_, { name, age }) => {
              const director = new Directors({ name, age });
              return director.save();
          },
      },
      addMovie: {
          type: MovieType,
          args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            genre: { type: new GraphQLNonNull(GraphQLString) },
            directorId: { type: new GraphQLNonNull(GraphQLID) },
            watched: { type: new GraphQLNonNull(GraphQLBoolean) },
            rate: { type: GraphQLInt },
          },
          resolve: (_, { name, genre, directorId, watched, rate }) => {
              const movie = new Movies({ name, genre, directorId, watched, rate });
              return movie.save();
          },
        },
        deleteDirector: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => Directors.findByIdAndRemove(id),
        },
        deleteMovie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => Movies.findByIdAndRemove(id),
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, { id, name, age }) => Directors.findByIdAndUpdate(
                id,
                { $set: { name, age } },
                { new: true },
            ),
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: new GraphQLNonNull(GraphQLID) },
                watched: { type: new GraphQLNonNull(GraphQLBoolean) },
                rate: { type: GraphQLInt },
            },
            resolve: (_, { id, name, genre, directorId, watched, rate }) => Movies.findByIdAndUpdate(
                id,
                { $set: { name, genre, directorId, watched, rate } },
                { new: true },
            ),
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
            args: { name: { type: GraphQLString } },
            resolve: (_, { name }) => Movies.find({ name: { $regex: name, $options: 'i' } }),
        },
        directors: {
            type: new GraphQLList(DirectorType),
            args: { name: { type: GraphQLString } },
            resolve: (_, { name }) => Directors.find({ name: { $regex: name, $options: 'i' } }),
        },
    },
});

module.exports = new GraphQLSchema({
   query: Query,
   mutation: Mutation,
});
