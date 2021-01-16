const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
} = require('graphql');

const { getArrayItemById } = require('../utils/helpers');

const movies = [
    { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
    { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
    { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Thriller', directorId: '3' },
    { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
];

const directors = [
    { id: '1', name: 'Quentin Tarantino', age: 57 },
    { id: '2', name: 'Michael Radford', age: 74 },
    { id: '3', name: 'James McTeigue', age: 53 },
    { id: '4', name: 'Guy Ritchie', age: 52 },
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve: ({ directorId }) => getArrayItemById(directors, directorId),
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => getArrayItemById(movies, id),
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => getArrayItemById(directors, id),
        },
    },
});

module.exports = new GraphQLSchema({
   query: Query,
});
