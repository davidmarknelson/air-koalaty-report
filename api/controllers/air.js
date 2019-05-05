const request = require('request');

const airRoutes = {
  get: (req, res) => {
    res.send('API works');
  },
  geo: (req, res) => {
    let lat = req.body.lat;
    let long = req.body.long;
    let url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.AIRVISUAL_API_KEY}`;
    request(url, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      res.status(200).json(body);
    });
  },
  countries: (req, res) => {
    let url = `https://api.airvisual.com/v2/countries?key=${process.env.AIRVISUAL_API_KEY}`;
    request(url, function(error, response, body) {
      res.status(200).json(body);
    });
  },
  states: (req, res) => {
    let country = req.query.country;
    let url = `https://api.airvisual.com/v2/states?country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
    request(url, function(error, response, body) {
      res.status(200).json(body);
    });
  },
  cities: (req, res) => {
    let country = req.query.country;
    let state = req.query.state;    
    let url = `https://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
    request(url, function(error, response, body) {
      res.status(200).json(body);
    });
  },
  city: (req, res) => {
    let city = req.query.city;
    let state = req.query.state;
    let country;
    (req.query.country === 'United States') ? country = 'USA' : country = req.query.country;
    let url = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${process.env.AIRVISUAL_API_KEY}`;
    request(url, function(error, response, body) {
      res.status(200).json(body);
    });
  }
}




module.exports = airRoutes;