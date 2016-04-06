var Location = require('./location');

var Tracker = function() {
    var self = this;
    self.locations = new Map();

    // Initilize current locations
    Location.all().forEach((location) => {
        self.locations.set(location, []);
    })
}

Tracker.prototype.format = function(cb) {
    var result = {};
    this.locations.forEach((people, location) => {
        result[location.name] = people;
    })
    return cb(undefined, result);
}

// Returns javascript map of locations
Tracker.prototype.getLocations = function() {
    return this.locations;
}

// add person to location
Tracker.prototype.add = function(locationId, name, cb) {
    var self = this;
    Location.findById(locationId, function(err, location) {
        if (err) {
            return cb(err);
        } else if (!location) {
            return cb(new Error('location with id ' + locationId + ' not found'));
        } else {
            self.remove(name, function(err) {
                if (err) {
                    return cb(err);
                } else {
                    console.log('Adding ' + name + ' to ' + location.name);
                    self.locations.get(location).push({ name: name })
                    return cb();
                }
            })
        }
    })
}

// Finds the user's location and index for that location
Tracker.prototype.findUserLocation = function(name, cb) {
    var self = this;

    for(var location of self.locations.keys()) {
        var people = self.locations.get(location);
        for(var i = 0; i < people.length; i++) {
            if(name == people[i].name) {
                return cb(undefined, location, i)
            }
        }
    }

    // Nothing was found
    return cb();
}

// Try and find user and remove them;
Tracker.prototype.remove = function(name, cb) {
    var self = this;
    
    self.findUserLocation(name, function(err, location, index) {
        if (err) {
            return cb(err, false);
        } else if (!location) {
            // No user to remove
            return cb(undefined, false);
        } else {
            console.log('Removing ' + name + ' from ' + location.name);
            self.locations.get(location).splice(index, 1);
            return cb(undefined, true);
        }
    });
}

module.exports = new Tracker();