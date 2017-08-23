var drivers = require('./drivers');
var deliveries = require('./deliveries');

function RecommendationsController() {
    var that = this;
    console.log(deliveries.deliveries);

    /**
     * Finds closest distance using the Haversine formula
     * @param {*} driver 
     */
    var findClosestLocation = function (latitude, longitude, locations) {
        var distances = locations.map(function (l) {
            return distanceBetweenLatandLongs(latitude, longitude, l.latitude, l.longitude);
        })
        return Math.min(distances);
    }

    var distanceBetweenLatandLongs = function (lat1, long1, lat2, long2) {
        var p = 0.017453292519943295;
        var a = 0.5 - cos((lat2 - lat1) * p) / 2 + cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p)) / 2;
        return 12742 * asin(sqrt(a))

    }

    var findClosestDelivery = function (driver) {
        var originParam = "origin=" + driver.latitude + "," + driver.longitude;
    }

    var findRecommendationByDriverId = function (req) {
        var driver = drivers.findDriverById(req)
        if (!driver) {
            return null;
        }
        closestDelivery = findClosestDelivery(driver);

        return null;
    }



    that.getById = function (req, res, next) {
        var recommendation = findRecommendationByDriverId(req);
        if (recommendation) {
            res.send(200, recommendation);
        } else {
            res.send(404, 'Invalid driver id.');
        }
    }


}

module.exports = new RecommendationsController();
