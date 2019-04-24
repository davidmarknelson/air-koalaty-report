const express         = require('express');
const router          = express.Router();
const air = require('../controllers/air');
const newuser = require('../controllers/newuser');


// GET API root
router.get('/api', air.get);

// Air Quality Routes
router.get('/api/airvisual/geo', air.geo);
router.get('/api/airvisual/city', air.city);

// Create new user
router.post('/api/newuser', newuser);

// List of cities routes
router.get('/api/citylist');
router.post('/api/citylist/new');
router.put('api/citylist/update');
router.delete('api/citylist/remove');

module.exports = router;