const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  cities: { 
    type: [{
      _id: mongoose.Schema.Types.ObjectId,
      city: String,
      state: String,
      country: String
    }], 
    validate: [
      (value) => {
        return value.length <= 3;
      }, 
      '{PATH} exceeds the limit of 3'
    ]
  }
});

module.exports = mongoose.model('User', userSchema);