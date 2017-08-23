var should = require('should');
var request = require('supertest');
var server = require('../../../app');

function DriversTestHelper() {
    this.APIrequest = function(endpoint) {
        return request(server)
        .get(endpoint)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    }
}

module.exports = new DriversTestHelper();


