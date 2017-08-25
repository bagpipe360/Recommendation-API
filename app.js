'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();
var drivers = require('./api/controllers/drivers');
var recomendations = require('./api/controllers/recommendations');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

app.get('drivers', drivers.get);
app.get('drivers/:id', drivers.getById);
app.get('drivers/:id/recommendations', drivers.getRecommendations);

app.get(/\/swagger\/?.*/, restify.plugins.serveStatic({
  directory: './public',
  default: 'swagger.yaml'
}));

SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }
  swaggerRestify.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);
});
