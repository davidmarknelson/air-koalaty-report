const middleware = {
  userObj: (req, res, next) => {
    let userId = req.query.userId;
    res.locals.user = {
      userId: userId,
      cities: []
    },
    next();
  }
}

module.exports = middleware;