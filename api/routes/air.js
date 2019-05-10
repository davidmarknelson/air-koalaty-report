const request = require('request');
const router = require('express').Router();

router.get('/geo', (req, res) => {
  let lat = req.body.lat;
  let long = req.body.long;
  let url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.AIRVISUAL_API_KEY}`;
  request(url, function(error, response, body) {
    if (error) {
      return res.status(500).json(error);
    }
    let parsedBody = JSON.parse(body);
    if (parsedBody.status !== 'success') {
      res.status(500).json(parsedBody.data);
    } else if (parsedBody.status === 'success') {
      res.status(200).json(parsedBody.data);
    }
  });
});

router.get('/countries', (req, res) => {
  let url = `https://api.airvisual.com/v2/countries?key=${process.env.AIRVISUAL_API_KEY}`;
  request(url, function(error, response, body) {
    if (error) {
      return res.status(500).json(error);
    }
    let parsedBody = JSON.parse(body);
    if (parsedBody.status !== 'success') {
      res.status(500).json(parsedBody.data);
    } else if (parsedBody.status === 'success') {
      res.status(200).json(parsedBody.data);
    }
  });
});

router.get('/states', (req, res) => {
  let country = req.query.country;
  let url = `https://api.airvisual.com/v2/states?country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
  request(url, function(error, response, body) {
    if (error) {
      return res.status(500).json(error);
    }
    let parsedBody = JSON.parse(body);
    if (parsedBody.status !== 'success') {
      res.status(500).json(parsedBody.data);
    } else if (parsedBody.status === 'success') {
      res.status(200).json(parsedBody.data);
    }
  });
});

router.get('/cities', (req, res) => {
  let country = req.query.country;
  let state = req.query.state;    
  let url = `https://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
  request(url, function(error, response, body) {
    if (error) {
      return res.status(500).json(error);
    }
    let parsedBody = JSON.parse(body);
    if (parsedBody.status !== 'success') {
      res.status(500).json(parsedBody.data);
    } else if (parsedBody.status === 'success') {
      res.status(200).json(parsedBody.data);
    }
  });
});

router.get('/city', (req, res) => {
  let city = req.query.city;
  let state = req.query.state;
  let country;
  (req.query.country === 'United States') ? country = 'USA' : country = req.query.country;
  let url = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
  request(url, function(error, response, body) {
    if (error) {
      return res.status(500).json(error);
    }
    let parsedBody = JSON.parse(body);
    if (parsedBody.status !== 'success') {
      res.status(500).json(parsedBody.data);
    } else if (parsedBody.status === 'success') {
      res.status(200).json(parsedBody.data);
    }
  });
});


module.exports = router;