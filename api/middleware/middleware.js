const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const mongoose = require('mongoose');

const middleware = {
  userObj: (req, res, next) => {
    let userId = req.query.userId;
    res.locals.user = {
      _id: new mongoose.Types.ObjectId(),
      userId: userId,
      cities: []
    };
    next();
  },
  jwtCheck: jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_API_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  }),
  parseReqBodyToAddCity: (req, res, next) => {
    let country;
    (req.body.country === 'United States') ? country = 'USA' : country = req.body.country;
    res.locals.cityObj = { 
      _id: new mongoose.Types.ObjectId(), 
      city: req.body.city, 
      state: req.body.state, 
      country: country
    };
    next();
  },
  parseReqBodyToRemoveCity: (req, res, next) => {
    (req.body.country === 'United States') ? res.locals.country = 'USA' : res.locals.country = req.body.country;
    next();
  },
}

module.exports = middleware;