var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var AWS = require('aws-sdk');

var config = require('./config')
var port = config.PORT;
var mongoUri = config.MONGO_URI;

var UserCtrl = require('./api/controllers/UserCtrl');
var InfoCtrl = require('./api/controllers/InfoCtrl');
var passport = require('./api/services/passport');

var app = express();
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());


/////////////////////////////////
//Amazon s3
AWS.config.update({accessKeyId: config.AWS_Access_Key, secretAccessKey: config.AWS_Secret_Access_Key});
AWS.config.accessKeyId = process.env.S3_KEY;
AWS.config.secretAccessKey = process.env.S3_SECRET;
AWS.config.region = 'us-west-2';

var photoBucket = new AWS.S3({params: {Bucket: 'insightfoodsales.com'}});

function uploadToS3(buf, file, callback) {
    photoBucket
        .upload({
            // Bucket: 'insightfoodsales.com',
            ACL: 'public-read', 
            Body: buf, 
            Key: file.name,
            ContentType: file.type
        }, callback)
}

app.post('/upload', function (req, res){
    console.log(1111, req.body)
    var buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var file = req.body.file;
 
    uploadToS3(buf, file, function (err, data) {
        if (err){
            console.error(err);
            return res.status(500).send('failed to upload to s3').end();
        } else {
            res.send(data)
        }
    })
});

///////////////////////////////////////////////////////

// AUTHENTICATION //
var isAdmin = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

app.use(session({
  secret: config.SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/user', UserCtrl.register);
app.get('/user', isAdmin, UserCtrl.me);
app.put('/users/:_id', isAdmin, UserCtrl.update);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});

/////////////////////////////////////////////////

//admin 
    //products
app.post('/admin/products', isAdmin, ProductCtrl.create);

app.get('/admin/products', isAdmin, ProductCtrl.get);

app.put('/admin/products', isAdmin, ProductCtrl.update);

app.delete('/admin/products', isAdmin, ProductCtrl.delete);

    //photos
app.post('/admin/photos', isAdmin, PhotoCtrl.create);

app.get('/admin/photos', isAdmin, PhotoCtrl.get);

app.put('/admin/photos', isAdmin, PhotoCtrl.update);

app.delete('/admin/photos', isAdmin, PhotoCtrl.delete);



////////////////////////////////////////////////

//CONNECTIONS

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongo DB at ' + mongoUri);
});

app.listen(port, function(){
	console.log("Listening on port " + port);
});
