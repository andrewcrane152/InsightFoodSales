// CONSTANTS
var CONFIG = require('./config');
var SECRET = process.env.SECRET || CONFIG.SECRET;
var MONGO_URI = process.env.MONGO_URI || CONFIG.MONGO_URI;
var PORT = process.env.PORT || CONFIG.PORT || 5000;

// MODULES
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

// CONTROLLERS
var UserCtrl = require('./api/controllers/UserCtrl');
var ManufacturerCtrl = require('./api/controllers/ManufacturerCtrl');
var AboutCtrl = require('./api/controllers/AboutCtrl');
var MissionCtrl = require('./api/controllers/MissionCtrl');

// SERVICES
var passport = require('./api/services/passport');
var s3 = require('./api/services/s3');


// EXPRESS + MIDDLEWARE
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: 'skfvisnmtj-68385-fjenfkvk-4hfidwjkenfj',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


// ROUTES -- COMMON
app.post('/login', passport.authenticate('local', {
  successRedirect: '/users/me',
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(204).send();
});

app.get('/users/me', UserCtrl.me);

app.get('/mfgrs', ManufacturerCtrl.get);
app.get('/mfgrs/:_id', ManufacturerCtrl.show);

app.get('/aboutus', AboutCtrl.get);
app.get('/mission', MissionCtrl.get);

// ROUTES -- AUTHED USER
var checkAuth = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

app.get('/users', UserCtrl.get);
app.get('/users/:_id', UserCtrl.show);
app.post('/users', UserCtrl.create);
app.put('/users/:_id', UserCtrl.update);
app.delete('/users/:_id', UserCtrl.destroy);

app.post('/mfgrs', ManufacturerCtrl.create);
app.put('/mfgrs/:_id', ManufacturerCtrl.update);
app.delete('/mfgrs/:_id', ManufacturerCtrl.destroy);

app.post('/aboutus', AboutCtrl.create);
app.put('/aboutus/_id', AboutCtrl.update);

app.post('/mission', MissionCtrl.create);
app.put('/mission/_id', MissionCtrl.update);

app.get('/s3_signed_url', s3.getSignedUrl);


//CONNECTIONS
mongoose.connect(MONGO_URI);
mongoose.connection.once('open', function(){
  app.listen(PORT);
});
