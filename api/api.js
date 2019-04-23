/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
*/
const request = require('request');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const User = require('./models/User');

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
  app.get('/api', (req, res) => {
    res.send('API works');
  });

  // Air Quality Routes
  app.get('/api/airvisual/geo', (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    let url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.AIRVISUAL_API_KEY}`;
    request(url, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      res.status(200).json(body);
    });
  });

  app.get('/api/airvisual/city', (req, res) => {
    let city = req.query.city;
    let state = req.query.state;
    let country;
    (req.query.country === 'United States') ? country = 'USA' : country = req.query.country;
    let url = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
    console.log(url);
    request(url, function(error, response, body) {
      res.status(200).json(body);
    });
  });
};