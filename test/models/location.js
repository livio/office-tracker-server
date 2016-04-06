var Location = require('../../models/location');
var assert = require('assert');

describe('Location', function() {


    describe(':constructor', function() {
        it('should create a new location object with a name and id', function(done) {
            var data = {
                id: 4,
                name: 'john doe'
            }
            var newLocation = new Location(data.id, data.name);
            assert.equal(newLocation.id, data.id);
            assert.equal(newLocation.name, data.name);
            done();
        })
    });


    describe(':findByID', function() {
        it('should return a location object if found', function(done) {
            var locationId = 1;
            Location.findById(locationId, function(err, location) {
                if (err) {
                    done(err);
                } else {
                    assert(location, 'No location found');
                    assert.equal(locationId, location.id);
                    done();
                }
            })
        })


        it('should return undefined if a location object is not found', function(done) {
            var locationId = 90000;
            Location.findById(locationId, function(err, location) {
                if (err) {
                    done(err);
                } else {
                    assert.equal(location, undefined);
                    done();
                }
            })
        });

    });

});
