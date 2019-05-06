const mongoose = require('mongoose');
const User = require('../models/user');
mongoose.set('useFindAndModify', false);

const cityList = {
  getCityList: (req, res) => {
    let userId = req.query.userId;
    User.findOne({ userId: userId }, (err, citylist) => {
      if (err) {
        console.log(err);
      }
      if (citylist === null) {
        User.create(res.locals.user, (err, newUser) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json(newUser);
        });
      } else {
        res.status(200).json(citylist);
      }
    });
  },
  addCity: (req, res) => {
    let userId = req.body.userId;
    let city = req.body.city;
    let state = req.body.state;
    let country;
    (req.body.country === 'United States') ? country = 'USA' : country = req.body.country;
    let cityObj = { city: city, state: state, country: country};
    User.findOneAndUpdate({ userId: userId }, {$push: {cities: cityObj}}, {new: true}, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(user);
    }); 
  },
  deleteCity: (req, res) => {
    let userId = req.body.userId;
    let city = req.body.city;
    let state = req.body.state;
    let country;
    (req.body.country === 'United States') ? country = 'USA' : country = req.body.country;
    let cityObj = { city: city, state: state, country: country};
    User.findOneAndUpdate({ userId: userId }, {$pull: {cities: cityObj}}, {new: true}, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(user);
    }); 
  }
}

module.exports = cityList;