var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var AWS = require('aws-sdk');

var port = 5000;
var mongoUri = "mongodb://localhost:27017/insight-website"

app.use(express.static(__dirname+'/public'));
app.use(cors());


// //Amazon s3
// // AWS.config.loadFromPath('./config/aws-config.json');
// // AWS.config.loadFromPath('./config_copy/aws-config.json');
// AWS.config.accessKeyId = process.env.S3_KEY;
// AWS.config.secretAccessKey = process.env.S3_SECRET;
// AWS.config.region = 'us-west-2';



// var photoBucket = new AWS.S3({params: {Bucket: 'paulphin'}});


// function uploadToS3(buf, file, callback) {
//     photoBucket
//         .upload({
//             // Bucket: 'paulphin',
//             ACL: 'public-read', 
//             Body: buf, 
//             Key: file.name,
//             ContentType: file.type
//         }, callback)
// }

// app.post('/upload', function (req, res){
//     console.log(1111, req.body)
//     var buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
//     var file = req.body.file;
//     // var pid = '10000' + parseInt(Math.random() * 10000000);
 
//     uploadToS3(buf, file, function (err, data) {
//         if (err){
//             console.error(err);
//             return res.status(500).send('failed to upload to s3').end();
//         } else {
//             res.send(data)
//         }
//     })
// })




// mongoose.connect(mongoUri);
// mongoose.connection.once('open', function(){
// 	console.log('Connected to mongodb at ' + mongoUri);
// });

app.listen(port, function(){
	console.log("now listening on port " + port);
});