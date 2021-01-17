const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
});

module.exports = model('Movie', movieSchema);
