const { Schema, model: mongooseModel } = require('mongoose');

const directorSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongooseModel('Director', directorSchema);
