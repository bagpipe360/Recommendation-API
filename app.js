'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


// serve swagger json
app.get(/\/swagger\/?.*/, restify.serveStatic ({
  directory: './api'
}));



app.get(/\/api\/?.*/, restify.serveStatic({
  directory: './public',
  default: '.index.html'
}));

app.get('test', function (req, res, next) {
  res.send('confirm');
});


SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);
});
