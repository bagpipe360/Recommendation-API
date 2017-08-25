var Driver = require('../models/Driver');
var recommendations = require('./recommendations');

function DriversController() {  
    // Maintain cache of drivers
    var driverStore = [];

    for(var i = 0; i < 50; i++) {
      driverStore.push(new Driver());
    }

    var findDriverById = function(req) {
      var found = driverStore.filter(function(p) {
        return p.id == req.params.id;
      })
      if (found && found.length > 0) {
        return found[0];
      }
      return null;
    }
  
    this.get = function(req, res, next) {
      if (res) {
        res.send(200, driverStore); 
        return next();
      } else {
        return driverStore;
      }
    }
  
    this.getById  = function(req, res, next) {
      var found = findDriverById(req);
      if (found){
        res.send(200, found);
      } else {
        res.send(404, 'Driver not found');
      }
    }

    this.getRecommendations = function(req, res, next) { 
      var driver = findDriverById(req);
      if (driver) {
        res.send(200, recommendations.getRecommendations(driver));
      } else {
        res.send(404, "Invalid driver ID");
      }
    }
  }
  
  module.exports = new DriversController();
  