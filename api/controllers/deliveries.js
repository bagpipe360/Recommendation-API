var sampleDeliveries= require('../../sample_data/deliveries');

function DeliveriesController() {
    var that = this;
    
    that.deliveries = sampleDeliveries;
  
  }
  
  module.exports = new DeliveriesController();
  