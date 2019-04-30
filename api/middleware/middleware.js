const middleware = {
  userObj: (req, res, next) => {
    let userId = req.query.userId;
    res.locals.user = {
      userId: userId,
      cities: [
        // {
        //   city: null,
        //   state: null,
        //   country: null
        // },
        // {
        //   city: null,
        //   state: null,
        //   country: null
        // }
        {
          city: 'Hanoi',
          state: 'Hanoi',
          country: "Vietnam"
        },
        {
          city: "Huntsville",
          state: "Alabama",
          country: "USA"
        }
      ]
    },
    next();
  }
}

module.exports = middleware;