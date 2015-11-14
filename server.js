var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var session = require('express-session');
// var AWS = require('aws-sdk');

var config = require('./config')
var port = config.PORT;
var mongoUri = config.MONGO_URI;


var app = express();
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());



//Amazon s3
// AWS.config.loadFromPath('./config/aws-config.json');
// AWS.config.loadFromPath('./config_copy/aws-config.json');
// AWS.config.accessKeyId = process.env.S3_KEY;
// AWS.config.secretAccessKey = process.env.S3_SECRET;
// AWS.config.region = 'us-west-2';



// var photoBucket = new AWS.S3({params: {Bucket: 'insightfoodsales.com'}});


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
    // var pid = '10000' + parseInt(Math.random() * 10000000);
 
    uploadToS3(buf, file, function (err, data) {
        if (err){
            console.error(err);
            return res.status(500).send('failed to upload to s3').end();
        } else {
            res.send(data)
        }
    })
});

/////////////////////////////////////////////////////////

// // AUTHENTICATION //
// var isAuthed = function(req, res, next) {
//   if (!req.isAuthenticated()) return res.status(401).send("you aren't authed");
//   return next();
// };

// var isTechnician = function(req, res, next){
// 	if (!req.user.isTech) return res.sendStatus(403);
// };

// app.use(session({
//   secret: config.SECRET,
//   saveUninitialized: true,
//   resave: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.post('/user', UserCtrl.register);
// app.get('/user', isAuthed, UserCtrl.me);
// app.put('/user', isAuthed, UserCtrl.update);
// app.get('/user/is_tech', isTechnician, function(req, res) {
// 	res.sendStatus(200);
// });

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/#claim'
// }));
// app.get('/logout', function(req, res) {
//   req.logout();
//   return res.redirect('/#intro');
// });

///////////////////////////////////////////////////


mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('Connected to mongodb at ' + mongoUri);
});

app.listen(port, function(){
	console.log("now listening on port " + port);
});
