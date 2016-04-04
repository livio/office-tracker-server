var assert = require('assert');
var tracker = require('../models/tracker');
var Location = require('../models/location');


describe('Tracker', function() {

    // it('should be initalized with locations', function(done) {
    //     var initialLocations = Location.all();
    //     var currentLocations = tracker.current();

    //     for (var key in initialLocations) {
    //         if (initialLocations.hasOwnProperty(key)) {
    //             var locationName = initialLocations[key].name;
    //             assert.deepEqual(currentLocations.get(locationName), []);
    //         }
    //     }

    //     done();
    // });


    // describe('Tracker:add', function() {

    //     it('should add a user to a location', function(done) {
    //         var location = Location.all()[1];
    //         var name = 'John Doe';

    //         assert(location);

    //         tracker.add(location.id, name, function(err) {
    //             if (err) {
    //                 done(err);
    //             } else {
    //                 var current = tracker.current();
    //                 var currentLocation = tracker.current(function(err, result) {
    //                     if (err) {
    //                         return done(err);
    //                     } else {
    //                         assert.equal(currentLocation.indexOf({ name: name }), 0);
    //                     }
    //                 });

    //             }
    //         })


    //     });
    // });


});
