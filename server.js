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

// SERVICES
var passport = require('./api/services/passport');
var s3 = require('./api/services/s3');


// EXPRESS + MIDDLEWARE
var app = express();
app.use(express.static(__dirname+'/public'));

// EXPRESS //
var app = express();

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

app.post('/mfgrs', checkAuth, ManufacturerCtrl.create);
app.put('/mfgrs/:_id', checkAuth, ManufacturerCtrl.update);
app.delete('/mfgrs/:_id', checkAuth, ManufacturerCtrl.destroy);

app.get('/s3_signed_url', checkAuth, s3.getSignedUrl);


//CONNECTIONS
mongoose.connect(MONGO_URI);
mongoose.connection.once('open', function(){
  app.listen(PORT);
});
