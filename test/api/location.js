var assert = require('assert');
var request = require('supertest');
var tracker = require('../../models/tracker');
var app = require('../../app');

var BASE_URL = '/location';

describe('Location API', function() {

    beforeEach(function(done) {
        tracker.reset();
        done();
    });

    describe('GET /location', function() {

        it('should return JSON', function(done) {
            request(app)
                .get(BASE_URL)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        });

    });

    describe('POST /location', function() {

        it('should add a user to a location', function(done) {
            var body = {
                name: 'mad max',
                location: 1
            }

            request(app)
                .post(BASE_URL)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err) {
                    if (err) {
                        return done(err);
                    } else {
                        tracker.findUserLocation(body.name, function(err, location) {
                            if (err) {
                                return done(err);
                            } else {
                                assert(location);
                                assert.equal(body.location, location.id);
                                done();
                            }
                        })
                    }
                })
        });

        it('should return 400 if name is not provided in body', function(done) {
            var body = {
                name: 'mad max'
            }

            request(app)
                .post(BASE_URL)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(done);
        });

        it('should return 400 if location is not provided in body', function(done) {
            var body = {
                location: 1
            }

            request(app)
                .post(BASE_URL)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(done);
        })

        it('should return 400 if location is not found', function(done) {
            var body = {
                name: 'mad max',
                location: -999
            };
            
            request(app)
                .post(BASE_URL)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(done); 
        })

    });


    describe('DELETE /location', function() {

        it('should remove a user from all locations', function(done) {

            var user = {
                name: 'mad max',
                location: 1
            }

            tracker.add(user.location, user.name, function(err) {
                if (err) {
                    return done(err);
                } else {
                    request(app)
                        .delete(BASE_URL)
                        .send({ name: user.name })
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err) {
                            if (err) {
                                return done(err);
                            } else {
                                tracker.findUserLocation(user.name, function(err, location) {
                                    if (err) {
                                        return done(err);
                                    } else {
                                        assert.equal(location, undefined);
                                        done();
                                    }
                                })
                            }
                        })
                }
            })
        });

        it('should return 400 if name is not defined in the body', function(done) {
            request(app)
                .delete(BASE_URL)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(done);
        })


    });

});
