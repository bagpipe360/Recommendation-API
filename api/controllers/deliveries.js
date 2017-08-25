Delivery = require('../models/Delivery');

function DeliveriesController() {
    // Maintain cache of deliveries
    var deliveriesStore = [];

    // Initialize with 20 delivery objects
    for (var i = 0; i < 10; i++) {
        deliveriesStore.push(new Delivery());
    }
    
    this.get = function () {
        return deliveriesStore;
    }

}

module.exports = new DeliveriesController();
