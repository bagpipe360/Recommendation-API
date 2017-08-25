var faker = require('faker');
var Location = require('./Location');

function Driver() {
    this.id = faker.random.uuid();
    this.name = faker.name.findName();
    this.current_location = new Location();
}
module.exports = Driver;