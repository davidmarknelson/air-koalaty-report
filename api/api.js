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

  // Air Geolocation Route
  app.get('/api/airvisual/geo', air.geo);

  // Air get city route
  app.get('/api/airvisual/city', air.city);

  // Air get country list routes
  app.get('/api/airvisual/countries', air.countries);
  app.get('/api/airvisual/countries/:country', air.states);
  app.get('/api/airvisual/countries/:country/:state', air.cities);
  app.get('/api/airvisual/countries/:country/:state/:city', air.city);



  // List of cities routes
  app.get('/api/citylist', jwtCheck, middleware.userObj, cityList.getCityList);
  app.put('/api/citylist/addcity', jwtCheck, cityList.addCity);
  app.put('/api/citylist/deletecity', jwtCheck, cityList.deleteCity);
};