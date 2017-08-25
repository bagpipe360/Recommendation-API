var faker = require('faker');
var Location = require('./Location');

function Delivery() {
    var getRandomFutureTimeStamp = function () {
        var currentTime = Date.now();
        // Add random amount of time with 24 hours to current Time
        return currentTime + 24 * 60 * 60 * Math.random();
    }

    this.deliver_by_timestamp = getRandomFutureTimeStamp();
    this.pickup_location = new Location();
    this.dropoff_location = new Location();
    this.id = faker.random.uuid();
}

module.exports = Delivery;