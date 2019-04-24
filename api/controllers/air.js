const request = require('request');

const airRoutes = {
  get: (req, res) => {
    res.send('API works');
  },
  geo: (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    let url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${process.env.AIRVISUAL_API_KEY}`;
    request(url, function(error, response, body) {
      if (error) {
        console.log(error);
      }
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