Delivery = require('../models/Delivery');

function DeliveriesController() {
    var deliveriesStore = [];

    for (var i = 0; i < 10; i++) {
        deliveriesStore.push(new Delivery());
    }
  
    this.get = function () {
        return deliveriesStore;
    }

}

module.exports = new DeliveriesController();
