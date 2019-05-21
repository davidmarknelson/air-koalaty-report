const User = require('../models/user');
const middleware = require('../middleware/middleware');
const router = require('express').Router();

router.get('/', middleware.jwtCheck, middleware.createNewUserObj, (req, res) => {
  User.findOne({ userId: req.query.userId })
    .then(user => {
      if (!user) { return User.create(res.locals.newUser) }
      return user;
    })
    .then(cityList => {
      res.status(200).json(cityList)
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

router.put('/addcity', middleware.jwtCheck, middleware.parseReqBodyToAddCity, (req, res) => {
  User.findOne({userId: req.body.userId})
    .then(user => {
      user.cities.push(res.locals.cityObj);
      return user.save();
    })
    .then(() => {
      res.status(200).json({ message: 'City successfully added.'});
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

router.put('/removecity', middleware.jwtCheck, (req, res) => {
  User.findOneAndUpdate({userId: req.body.userId}, {$pull: {cities: {_id: req.body.cityId}}})
    .then(() => {
      res.status(200).json({ message: 'City successfully deleted.' });
    })
    .catch(err => res.status(500).json({ message: err.message })); 
});


module.exports = router;