
function Location() {

    var louisianaCenteredLocs = function () {
        // Louisiana coordinates
        var latCenter = 30.391830;
        var longCenter = -92.329102;
        // Using fixed value of 3 to find more general locations and prevent invalid responses from Google
        var randomLat = getRandomInRange(latCenter - 1, latCenter + 1, 3);
        var randomLong = getRandomInRange(longCenter - 1, longCenter + 1, 3);
        return { lat: randomLat, long: randomLong };        
    }
    
    // @see https://stackoverflow.com/questions/6878761/javascript-how-to-create-random-longitude-and-latitudes
    var getRandomInRange = function (from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    var latAndLong = louisianaCenteredLocs();
    this.latitude = latAndLong.lat;
    this.longitude = latAndLong.long;
}

module.exports = Location;