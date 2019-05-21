const rp = require('request-promise-native');
const router = require('express').Router();

router.get('/geo', (req, res) => {
  let url = `https://api.airvisual.com/v2/nearest_city?lat=${req.body.lat}&lon=${req.body.long}&key=${process.env.AIRVISUAL_API_KEY}`;
  rp({uri: url, json: true})
    .then(body => {
      res.status(200).json(body.data);
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).json({ message: err.error.data.message || 'Something went wrong!' });
    });
});

router.get('/countries', (req, res) => {
  let url = `https://api.airvisual.com/v2/countries?key=${process.env.AIRVISUAL_API_KEY}`;
  rp({uri: url, json: true})
    .then(body => {
      res.status(200).json(body.data);
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).json({ message: err.error.data.message || 'Something went wrong!' });
    });
});

router.get('/states', (req, res) => {
  let url = `https://api.airvisual.com/v2/states?country=${req.query.country}&key=${process.env.AIRVISUAL_API_KEY}`;
  rp({uri: url, json: true})
    .then(body => {
      res.status(200).json(body.data);
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).json({ message: err.error.data.message || 'Something went wrong!' });
    });
});

router.get('/cities', (req, res) => {   
  let url = `https://api.airvisual.com/v2/cities?state=${req.query.state}&country=${req.query.country}&key=${process.env.AIRVISUAL_API_KEY}`;
  rp({uri: url, json: true})
    .then(body => {
      res.status(200).json(body.data);
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).json({ message: err.error.data.message || 'Something went wrong!' });
    });
});

router.get('/city', (req, res) => {
  let country;
  (req.query.country === 'United States') ? country = 'USA' : country = req.query.country;
  let url = `https://api.airvisual.com/v2/city?city=${req.query.city}&state=${req.query.state}&country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
  rp({uri: url, json: true})
    .then(body => {
      res.status(200).json(body.data);
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).json({ message: err.error.data.message || 'Something went wrong!' });
    });
});

module.exports = router;