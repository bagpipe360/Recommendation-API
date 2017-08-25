var should = require('should');
var request = require('supertest');
var recommendations = require('../../../api/controllers/recommendations');
var drivers = require('../../../api/controllers/drivers');
var server = require('../../../app');

var driverStore = drivers.get();
var id = driverStore[0].id;


describe('controllers', function () {
    describe('recommendations', function () {
        describe('GET /drivers/:id/recommendations', function () {
            it('should return 200', function (done) {
                request(server)
                    .get('/drivers/' + id + '/recommendations')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        done();
                    });
            });
            it('random item should be a Delivery', function (done) {
                request(server)
                    .get('/drivers/' + id + '/recommendations')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        var delveriesJSON = res.body;
                        var randomTest = Math.floor(Math.random() * delveriesJSON.length)
                        delveriesJSON[randomTest].should.have.property('deliver_by_timestamp');
                        delveriesJSON[randomTest].should.have.property('pickup_location');
                        delveriesJSON[randomTest].should.have.property('dropoff_location');
                        done();
                    })
            });
        });
    });
});
