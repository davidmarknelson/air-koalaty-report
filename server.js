const app = require('express')();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const routes = require('./api/api');
const cors = require('cors');

// MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const monDb = mongoose.connection;

monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that', process.env.MONGO_URI, 'is running.');
});

monDb.once('open', function callback() {
  console.info('Connected to MongoDB:', process.env.MONGO_URI);
});

// App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

// Set port
const port = process.env.PORT || 8083;
app.set('port', port);

// Set static path to Angular app in dist
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.use('/', express.static(path.join(__dirname, './dist')));
}

// Routes
app.use(routes);

// Pass routing to Angular app
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));