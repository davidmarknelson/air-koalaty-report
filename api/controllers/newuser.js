const mongoose = require('mongoose');
const User = require('../models/user');
const middleware = require('../middleware/middleware');

const newuser = (req, res) => {
  // let userId = req.query.id;
  User.create(middleware.newuserObj, (err, newUser) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(newUser);
  })
}

module.exports = newuser;