const mongoose = require('mongoose');
const User = require('../models/user');
const middleware = require('../middleware/middleware');

const users = {
  getCityList: (req, res) => {
    let userId = req.query.userId;
    User.findOne({ userId: userId}, (err, citylist) => {
      if (err) {
        return console.log(err);
      }
      // if (citylist === null) {
      //   User.create(res.locals.user, (err, newUser) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     res.status(200).json(newUser);
      //   });
      // }
      res.status(200).json(citylist);
    });
  }
}

module.exports = users;