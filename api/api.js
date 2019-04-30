/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
*/
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const express = require('express');
const air = require('./controllers/air');
const users = require('./controllers/users');
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

  // Create new user
  app.post('/api/newuser', jwtCheck, users.newuser);

  // List of cities routes
  app.get('/api/citylist');
  app.post('/api/citylist/new');
  app.put('api/citylist/update');
  app.delete('api/citylist/remove');
};