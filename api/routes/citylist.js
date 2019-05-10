const User = require('../models/user');
const middleware = require('../middleware/middleware');
const router = require('express').Router();

router.get('/', middleware.jwtCheck, middleware.userObj, (req, res) => {
  let userId = req.query.userId;
  User.findOne({ userId: userId })
    .then(user => {
      if (!user) { return User.create(res.locals.user) }
      return user;
    })
    .then(cityList => {
      res.status(200).json(cityList)
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

router.put('/addcity', middleware.jwtCheck, middleware.parseReqBodyToAddCity, (req, res) => {
  let userId = req.body.userId;
  console.log(res.locals.cityObj);
  User.findOneAndUpdate({userId: userId}, {$push: {cities: res.locals.cityObj}}, {new: true})
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    });
});

router.put('/removecity', middleware.jwtCheck, middleware.parseReqBodyToRemoveCity, (req, res) => {
  let userId = req.body.userId;
  User.findOne({ userId: userId })
    .then(user => {
      for (let city of user.cities) {
        if (city.city === req.body.city &&
            city.state === req.body.state &&
            city.country === res.locals.country) {
          return city._id
        }
      }
    })
    .then(cityId => {
      return User.findOneAndUpdate({userId: userId}, {$pull: {cities: {_id: cityId}}}, {new: true})
    })
    .then(() => {
      res.status(200).json({ message: 'City successfully deleted.' });
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    }); 
});


module.exports = router;