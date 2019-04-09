const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO = validate length of the array

const userSchema = new Schema({
  cities: Array
});

module.exports = mongoose.model('User', userSchema);