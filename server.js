var CONFIG = require('./config');
var SECRET = process.env.SECRET || CONFIG.SECRET;

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var UserCtrl = require('./api/controllers/UserCtrl');
var InfoCtrl = require('./api/controllers/InfoCtrl');

var passport = require('./api/services/passport');
var s3 = require('./api/services/s3');

var app = express();
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});

app.post('/user', UserCtrl.register);

// ADMIN ROUTES
var checkAuth = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

app.get('/users', checkAuth, UserCtrl.get);
app.get('/users/me', checkAuth, UserCtrl.me);
app.get('/users/:_id', checkAuth, UserCtrl.show);
app.post('/users', checkAuth, UserCtrl.create);
app.put('/users/:_id', checkAuth, UserCtrl.update);
app.delete('/users/:_id', checkAuth, UserCtrl.destroy);

app.get('/mfgrs', checkAuth, InfoCtrl.get);
app.get('/mfgrs/:_id', checkAuth, InfoCtrl.show);
app.post('/mfgrs', checkAuth, InfoCtrl.create);
app.put('/mfgrs/:_id', checkAuth, InfoCtrl.update);
app.delete('/mfgrs/:_id', checkAuth, InfoCtrl.destroy);

app.get('/s3_signed_url', checkAuth, s3.getSignedUrl);

//CONNECTIONS
var MONGO_URI = process.env.MONGO_URI || CONFIG.MONGO_URI;
var PORT = process.env.PORT || CONFIG.PORT || 5000;

mongoose.connect(MONGO_URI);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongo DB at ' + MONGO_URI);
  app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
  });
});
