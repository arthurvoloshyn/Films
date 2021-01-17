const { Schema, model } = require('mongoose');

const directorSchema = new Schema({
    name: String,
    age: Number,
});

module.exports = model('Director', directorSchema);
