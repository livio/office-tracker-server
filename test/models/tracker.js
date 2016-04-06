var assert = require('assert');
var tracker = require('../../models/tracker');
var Location = require('../../models/location');


describe('Tracker', function() {

    describe(':constructor', function() {
        it('should be initalized with locations', function(done) {
            var initialLocations = Location.all();
            var currentLocations = tracker.getLocations();
            initialLocations.forEach(location => {
                assert.deepEqual(currentLocations.get(location), []);
            })

            done();
        });
    });

    describe(':add', function() {

        it('should add a user to a location', function(done) {
            var location = Location.all()[0];
            var name = 'john doe';

            tracker.add(location.id, name, function(err) {
                if (err) {
                    return done(err);
                } else {
                    assert.equal(tracker.getLocations().get(location)[0].name, name);
                    return done();
                }
            })

        });

    });
    
    describe(':format', function() {
        it('should return a new javascript object in the correct format', function(done) {
            
            var allLocations = Location.all();
            var locationOne = allLocations[0];
            var locationOneUsers = [{ name: 'mad max' }, {name: 'super man'}];
            var locationTwo = allLocations[1];
            var locationTwoUsers = [{ name: 'famous actor'}];
            
            // Manually add user to tracker map
            tracker.getLocations().set(locationOne, locationOneUsers);
            tracker.getLocations().set(locationTwo, locationTwoUsers);
            
            tracker.format(function(err, result) {
                if(err) {
                    return done(err);
                } else {
                    assert(result);
                    
                    // Check that the object is formatted as follows:
                    // { 'location name': [{},{}], 'location name two': [] }
                    var keyCount = 0;
                    for(key in result) {
                        keyCount++;
                        if(result.hasOwnProperty(key)) {
                            var locationFound = false;
                            allLocations.forEach(location => {
                                if(location.name == key) {
                                    locationFound = true;
                                    if(location == locationOne) {
                                        assert.deepEqual(result[key], locationOneUsers);
                                    } else if(location == locationTwo) {
                                        assert.deepEqual(result[key], locationTwoUsers);
                                    }
                                }
                            })
                            
                            assert(locationFound);
                        }
                    }
                    
                    // The number of keys in the object should be equal to the number of locations that are configured
                    assert.equal(keyCount, allLocations.length);
                    
                    done();
                }
            })
        })
    })

    describe(':remove', function() {
        it('should remove a user from the tracker and return true when a user is successfully removed', function(done) {
            var location = Location.all()[0];
            var name = 'mad max';

            // Manually add user to tracker map
            tracker.getLocations().set(location, [{ name: name }]);
            
            tracker.remove(name, function(err, result) {
                if(err) {
                    return done(err);
                } else {
                    assert(result);
                    assert.equal(tracker.getLocations().get(location)[0], undefined, 'User was not removed');
                    done();
                }
            });
        })
    })

    describe(':findUserLocation', function() {

        it('should find a users location and index', function(done) {
            var location = Location.all()[0];
            var name = 'mad max';

            // Manually add user to tracker map
            tracker.getLocations().set(location, [{ name: 'mad max' }]);

            tracker.findUserLocation(name, function(err, foundLocation, index) {
                if (err) {
                    return done(err);
                } else {
                    assert(foundLocation);
                    assert.equal(foundLocation.id, location.id);
                    assert.equal(tracker.getLocations().get(location)[index].name, name);
                    return done();
                }
            })
        })

        it('should return undefined if the user location is unknown', function(done) {
            tracker.findUserLocation('user does not exist', function(err, foundLocation, index) {
                if (err) {
                    return done(err);
                } else {
                    assert.equal(foundLocation, undefined);
                    return done();
                }
            })
        })

    });


});
