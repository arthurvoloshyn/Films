const { Schema, model: mongooseModel } = require('mongoose');

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
});

module.exports = mongooseModel('Movie', movieSchema);
