const mongoose = require('mongoose');
const User = require('../models/user');
const middleware = require('../middleware/middleware');

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
    let userId = req.query.userId;
    let city = req.query.city;
    let state = req.query.state;
    let country;
    (req.query.country === 'United States') ? country = 'USA' : country = req.query.country;
    let cityObj = { city: city, state: state, country: country};
    User.findOneAndUpdate({ userId: userId }, {$push: {cities: cityObj}}, {new: true}, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(user);
    }); 
  }
}

module.exports = users;