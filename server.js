const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const routes = require('./api/api');
const cors = require('cors');

// MongoDB
mongoose.connect(process.env.MONGO_URI, { useCreateIndex: false, useFindAndModify: false, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
const monDb = mongoose.connection;

monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

monDb.once('open', function callback() {
  console.info('Connected to MongoDB.');
});

// Force SSL
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
  next(); }
}

// App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
if (process.env.NODE_ENV !== 'dev') {
  app.use(forceSSL());
}

// Routes
app.use(routes);

// Set static path to Angular app in dist
if (process.env.NODE_ENV !== 'dev') {
  app.use(express.static(__dirname + '/dist/'));
}

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
if (process.env.NODE_ENV !== 'dev') {
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });
}

// Server
app.listen(process.env.PORT || 8083, () => console.log('Server running.'));