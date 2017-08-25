var drivers = require('./drivers');
var deliveries = require('./deliveries');
var distance = require('google-distance');
var haversine = require('haversine');

function RecommendationsController() {
    // Load static deliveries
    var deliveriesStore = deliveries.get();
    // Keep track of best delivery IDs so they are not recommended multiple times
    var bestDeliveries = [];

    /**
     * Compare function to return ASC by distances
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * @param {*} a 
     * @param {*} b 
     */
    var compareDistances = function (a, b) {
        return a.distance - b.distance;
    }

    /**
     * Finds deliveries based on proxmitiy of user and other user's current recommendations
     * returns Array of Deliveries
     * @param {*} location 
     */
    var findRecommendations = function (location) {
        // Array of deliveries sorted by distance to user, not included best delivery
        var sortedDeliveries = [];
        var tempDistance = 0;
        var prevDistance = 0;
        var bestDelivery;
        // Add distance to the delivery objects, and keep track of the closest delivery to the input location
        deliveriesStore = deliveriesStore.map(function (delivery) {
            tempDistance = distanceBetweenLatandLongs(location.latitude, location.longitude, delivery.pickup_location.latitude, delivery.pickup_location.longitude);
            // A bestDelivery needs to be the closest to the driver and not have been recommended to another driver
            if (tempDistance < prevDistance && bestDeliveries.indexOf(delivery.id) == -1) {
                bestDelivery = delivery;
            } 
            sortedDeliveries.push(delivery);
            delivery.distance = tempDistance;
            prevDistance = tempDistance;
            return delivery;
        });
        // Sort the built deliveries, which include all but the bestDelivery
        sortedDeliveries = sortedDeliveries.sort(compareDistances);
        // Store the best delivery ID so it is not reassigned to another user
        if (bestDelivery) {
            bestDeliveries.push(bestDelivery.id);
            // Remove bestDelivery from sortedDeliveries
            sortedDeliveries = sortedDeliveries.filter(function( obj ) {
                return obj.id !== bestDelivery.id;
            });
            return [bestDelivery].concat(sortedDeliveries)
        } else {
            // If no bestDelivery was found, return all deliveries in ascending order
            return sortedDeliveries;
        }
    }

    /**
     * Uses Haversine formula to calculate distance between two lat/long pairs
     * returns float
     * @param {*} lat1 
     * @param {*} long1 
     * @param {*} lat2 
     * @param {*} long2 
     */
    var distanceBetweenLatandLongs = function (lat1, long1, lat2, long2) {
        var start = { latitude: lat1, longitude: long1 };
        var end = { latitude: lat2, longitude: long2 };
        return haversine(start, end, { unit: 'mile' });
    }

    /**
     * /drivers/:id/recommendations
     */
    this.getRecommendations = function (driver) {
        return findRecommendations(driver.current_location);
    }

}

module.exports = new RecommendationsController();
