const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const middleware = {
  userObj: (req, res, next) => {
    let userId = req.query.userId;
    res.locals.user = {
      userId: userId,
      cities: []
    },
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
  })
}

module.exports = middleware;