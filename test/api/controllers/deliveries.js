var should = require('should');
var request = require('supertest');
var deliveries = require('../../../api/controllers/deliveries');

describe('controllers', function () {
    describe('deliveries', function () {
        it('should return ARRAY', function (done) {
            var delveriesJSON = deliveries.get();
            delveriesJSON.should.be.instanceof(Array)
            done();
        });
        it('should be populated with Objects', function (done) {
            var delveriesJSON = deliveries.get();
            for(var i = 0; i < delveriesJSON.length; i++) {
                delveriesJSON[i].should.be.instanceof(Object)
            }
            done();
        });
        it('should contain deliveries with params: deliver_by_timestamp, pickup_location, dropoff_location', function (done) {
            var delveriesJSON = deliveries.get();
            var randomTest = Math.floor(Math.random() * delveriesJSON.length)
            delveriesJSON[randomTest].should.have.property('deliver_by_timestamp');
            delveriesJSON[randomTest].should.have.property('pickup_location');
            delveriesJSON[randomTest].should.have.property('dropoff_location');
            done();
        });
    });
});


