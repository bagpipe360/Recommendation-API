var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var drivers = require('../../../api/controllers/drivers');


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
                        res.body.should.be.instanceOf(Array);
                        done();
                    })
            });
            it('if first item is occupied should be of type Object with id, name and current_location params', function (done) {
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        res.body[0].should.be.instanceOf(Object);                        
                        res.body[0].should.have.property('id');
                        res.body[0].should.have.property('name');
                        res.body[0].should.have.property('current_location');
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
                        res.body[0].current_location.should.have.property('latitude');
                        res.body[0].current_location.should.have.property('longitude');
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
                        done();
                    });
            });
            it('invalid user id should return 404', function (done) {
                request(server)
                    .get('/drivers/-1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end(function (err, res) {
                        done();
                    });
            });
            it('should have properties of Driver- id, name, current_location', function (done) {
                var driverStore = drivers.get();
                var id = driverStore[0].id;
                request(server)
                    .get('/drivers/' + id)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end(function (err, res) {
                        console.log(res.body);
                        res.body.should.have.property('id');
                        res.body.should.have.property('name');
                        res.body.should.have.property('current_location');
                        res.body.current_location.should.have.property('latitude');
                        res.body.current_location.should.have.property('longitude');
                        done();
                    });
            });
        });
    });
});
