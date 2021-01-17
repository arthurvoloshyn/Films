const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = require('graphql');

const { getCollectionItemById, getCollectionItemsByDirectorId } = require('../utils/helpers');

const directorsJson = [
    { "name": "Quentin Tarantino", "age": 57 }, // 60048d9e0af866c3123b6f3a
    { "name": "Michael Radford", "age": 74 }, // 60048ea50af866c3123b6f3b
    { "name": "James McTeigue", "age": 53 }, // 60048edc0af866c3123b6f3c
    { "name": "Guy Ritchie", "age": 52 }, // 60048f0a0af866c3123b6f3d
];

const moviesJson = [
    { "name": "Pulp Fiction", "genre": "Crime", "directorId": "60048d9e0af866c3123b6f3a" },
    { "name": "1984", "genre": "Sci-Fi", "directorId": "60048ea50af866c3123b6f3b" },
    { "name": "V for vendetta", "genre": "Sci-Fi-Thriller", "directorId": "60048edc0af866c3123b6f3c" },
    { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "60048f0a0af866c3123b6f3d" },
    { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "60048d9e0af866c3123b6f3a" },
    { "name": "The Hateful Eight", "genre": "Crime", "directorId": "60048d9e0af866c3123b6f3a" },
    { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "60048d9e0af866c3123b6f3a" },
    { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "60048f0a0af866c3123b6f3d" },
];

const movies = [
    { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
    { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
    { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Thriller', directorId: '3' },
    { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
    { id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
    { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
    { id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1' },
    { id: '8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4' },
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
            resolve: ({ directorId }) => getCollectionItemById(directors, directorId),
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
            resolve: ({ id }) => getCollectionItemsByDirectorId(movies, id),
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => getCollectionItemById(movies, id),
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }) => getCollectionItemById(directors, id),
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: () => movies,
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: () => directors,
        },
    },
});

module.exports = new GraphQLSchema({
   query: Query,
});
