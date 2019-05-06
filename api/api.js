// Dependencies
const air = require('./controllers/air');
const cityList = require('./controllers/citylist');
const middleware = require('./middleware/middleware');
const router = require('express').Router();

// API Routes

// GET API root
router.get('/api', air.get);

// Air Geolocation Route
router.get('/api/airvisual/geo', air.geo);;

// Air country, state, and city list routes
router.get('/api/airvisual/countries', air.countries);
router.get('/api/airvisual/states', air.states);
router.get('/api/airvisual/cities', air.cities);
router.get('/api/airvisual/city', air.city);

// List of city list routes for authorized users
router.get('/api/citylist', middleware.jwtCheck, middleware.userObj, cityList.getCityList);
router.put('/api/citylist/addcity', middleware.jwtCheck, cityList.addCity);
router.put('/api/citylist/deletecity', middleware.jwtCheck, cityList.deleteCity);

module.exports = router;