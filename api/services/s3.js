var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var AWS_REGION = process.env.AWS_REGION;
var AWS_SIGNATURE_VERSION = process.env.AWS_SIGNATURE_VERSION;
var S3_BUCKET = process.env.S3_BUCKET;
var S3_BUCKET_URL = 'https://' + S3_BUCKET + '.s3.amazonaws.com/';

var aws = require('aws-sdk');

module.exports = {

  getSignedUrl: function(req, res, next) {
    aws.config.update({ accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    aws.config.update({ region: AWS_REGION, signatureVersion: AWS_SIGNATURE_VERSION });
    var s3 = new aws.S3();
    var s3_params = {
      Bucket: S3_BUCKET,
      Key: req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data) {
      if (err) return next(err);
      var return_data = {
        signed_request: data,
        url: S3_BUCKET_URL + req.query.file_name
      };
      res.json(return_data);
    });
  }
};
