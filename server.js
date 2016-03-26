// CONSTANTS
require('dotenv').config({path: './.env'});
var SECRET = process.env.SECRET;
var MONGO_URI = process.env.MONGO_URI;
var PORT = process.env.PORT;

// MODULES
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// CONTROLLERS
var UserCtrl = require('./api/controllers/UserCtrl');
var ManufacturerCtrl = require('./api/controllers/ManufacturerCtrl');
var ContentCtrl = require('./api/controllers/ContentCtrl');

// SERVICES
var passport = require('./api/services/passport');
var s3 = require('./api/services/s3');

// EXPRESS + MIDDLEWARE
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(session({
  secret: SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());


// ROUTES -- COMMON
app.post('/login', passport.authenticate('local', {
  successRedirect: '/users/me',
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  res.status(204).send();
});

app.get('/users/me', UserCtrl.me);

app.get('/mfgrs', ManufacturerCtrl.get);
app.get('/mfgrs/:_id', ManufacturerCtrl.show);

app.get('/content/:section', ContentCtrl.show);

// ROUTES -- AUTHED USER
var checkAuth = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

app.get('/users', checkAuth, UserCtrl.get);
app.get('/users/:_id', checkAuth, UserCtrl.show);
app.post('/users', checkAuth, UserCtrl.create);
app.put('/users/:_id', checkAuth, UserCtrl.update);
app.delete('/users/:_id', checkAuth, UserCtrl.destroy);

app.put('/content/:section', checkAuth, ContentCtrl.update);

app.post('/mfgrs', checkAuth, ManufacturerCtrl.create);
app.put('/mfgrs/:_id', checkAuth, ManufacturerCtrl.update);
app.delete('/mfgrs/:_id', checkAuth, ManufacturerCtrl.destroy);

app.get('/s3_signed_url', checkAuth, s3.getSignedUrl);

//CONNECTIONS
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.once('open', function(){
  app.listen(PORT);
});
