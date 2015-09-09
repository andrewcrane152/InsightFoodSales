var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = 5000;
var mongoUri = "mongodb://localhost:27017/insight-website"

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(cors());




mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('Connected to mongodb at ' + mongoUri);
});

app.listen(port, function(){
	console.log("now listening on port " + port);
});