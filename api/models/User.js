const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO = validate length of the array
const checkCitiesLength = citiesLength => {
  return citiesLength <= 3;
}

const citySchema = new Schema({
  city: String,
  state: String,
  country: String
});

const userSchema = new Schema({
  userId: String,
  cities: [citySchema]
});

module.exports = mongoose.model('User', userSchema);