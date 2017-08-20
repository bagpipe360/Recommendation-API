var sampleDrivers = require('../../sample_data/drivers');

function DriversController() {
    var that = this;
    // Memory storage
    that.store = [];
  
    var findDriverById = function(req) {
      var found = that.store.filter(function(p) {
        return p.Id = parseInt(req.params.id);
      })
      if (found && found.length > 0) {
        return found[0];
      }
      return null;
    }
  
    that.get = function(req, res, next) {
      res.send(200, sampleDrivers);
      return next();
    }
  
    that.getById  = function(req, res, next) {
      var found = findDriverById(req);
      if (found){
        res.send(200, found);
      } else {
        res.send(404, 'product not found');
      }
    }
  

  
  }
  
  module.exports = new DriversController();
  