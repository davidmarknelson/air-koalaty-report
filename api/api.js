/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
*/
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const air = require('./controllers/air');
const cityList = require('./controllers/citylist');
const middleware = require('./middleware/middleware');

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
*/

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
*/

  // GET API root
  app.get('/api', air.get);

  // Air Quality Routes
  app.get('/api/airvisual/geo', air.geo);
  app.get('/api/airvisual/city', air.city);

  // List of cities routes
  app.get('/api/citylist', jwtCheck, middleware.userObj, cityList.getCityList);
  app.put('/api/citylist/addcity', jwtCheck, cityList.addCity);
  app.put('/api/citylist/deletecity', jwtCheck, cityList.deleteCity);
};