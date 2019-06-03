// Dependencies
const cityListRoutes = require('./routes/citylist');
const router = require('express').Router();
const airVisualRoutes = require('./routes/air');

// ==============================================
// API Routes
// ==============================================

// GET API root
router.get('/api', (req, res) => {
  res.send('API works');
});

// Air Geolocation Route
router.use('/api/airvisual', airVisualRoutes);

// List of city list routes for authorized users
router.use('/api/citylist', cityListRoutes);

// Handle errors
router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

module.exports = router;