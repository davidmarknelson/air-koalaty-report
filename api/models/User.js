const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO = validate length of the array

const userSchema = new Schema({
  userId: String,
  cities: {
    cityA: {
      city: String,
      state: String,
      Country: String
    },
    cityB: {
      city: String,
      state: String,
      Country: String
    },
    cityC: {
      city: String,
      state: String,
      Country: String
    },
    cityD: {
      city: String,
      state: String,
      Country: String
    }
  }
});

module.exports = mongoose.model('User', userSchema);