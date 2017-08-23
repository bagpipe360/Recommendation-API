var should = require('should');
var request = require('supertest');
var server = require('../../../app');

var api = require('../helpers/drivers');

describe('controllers', function () {
    describe('drivers', function () {
        describe('GET /drivers', function () {
            it('should return 200', function (done) {
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        done();
                    });
            });
            it('should return an array', function (done) {
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        JSON.parse(res.text).should.be.instanceOf(Array);
                        done();
                    })
            });
            it('if first item is occupied should have id, name and current_locations', function (done) {
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        var json = JSON.parse(res.text);
                        json[0].should.have.property('id');
                        json[0].should.have.property('name');
                        json[0].should.have.property('current_location');
                        done();
                    })
            });
            it('should have lat and long if it has current_location', function (done) {
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        var json = JSON.parse(res.text);
                        json[0].current_location.should.have.property('latitude');
                        json[0].current_location.should.have.property('longitude');
                        done();
                    });
            });
        });
        describe('GET /drivers/:id', function () {
            it('should return 200', function (done) {
                request(server)
                    .get('/drivers/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        done();
                    });
            });
            it('should return 404', function (done) {
                request(server)
                    .get('/drivers/-1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end(function (err, res) {
                        should.not.exist(err);
                        done();
                    });
            });
            it('should have properties of Driver- id, name, current_location', function (done) {
                request(server)
                    .get('/drivers/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end(function (err, res) {
                        var json = JSON.parse(res.text);
                        json.should.have.property('id');
                        json.should.have.property('name');
                        json.should.have.property('current_location');
                        json.current_location.should.have.property('latitude');
                        json.current_location.should.have.property('longitude');
                        done();
                    });
            });
        });
    });
});
