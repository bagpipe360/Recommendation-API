'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();
var sampleDeliveries = require('./sample_data/deliveries');
var drivers = require('./api/controllers/drivers');
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

app.get('api/drivers', drivers.get);
app.get('api/drivers/:id', drivers.getById);



SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);
});
