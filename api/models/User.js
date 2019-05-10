const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  city: String,
  state: String,
  country: String
});

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  cities: [citySchema]
});

module.exports = mongoose.model('User', userSchema);