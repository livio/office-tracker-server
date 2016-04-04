var Location = require('./location');

var Tracker = function() {
    this.currentLocations = {};
    
    // Initilize current locations
    var locations = Location.all();
    for(key in locations) {
        if(locations.hasOwnProperty(key)) {
            this.currentLocations[locations[key].name] = [];
        }
    }
}

Tracker.prototype.current = function() {
    return this.currentLocations;
}



// add person to location
Tracker.prototype.add = function(locationId, name, cb) {
    var self = this;
    Location.findById(locationId, function(err, location) {
        if(err) {
            return cb(err);
        } else if(!location) {
            return cb(new Error('location with id ' + locationId + ' not found'));
        } else {
            self.findAndRemove(name, function(err) {
                if(err) {
                    return cb(err);
                } else {
                    console.log('Adding ' + name + ' to ' + location.name);
                    self.currentLocations[location.name].push({name: name});
                    return cb();
                }
            })
        }
    })
}

// Try and find user and remove them;
Tracker.prototype.findAndRemove = function(name, cb) {
    var self = this;
    for(var key in self.currentLocations) {
        if(self.currentLocations.hasOwnProperty(key)) {
            var people = self.currentLocations[key];
            for(var i = 0; i < people.length; i++) {
                if(name === people[i].name) {
                    // Remove them
                    console.log('Removing ' + name + ' from ' + key);
                    self.currentLocations[key].splice(i,1);
                    return cb();
                }
            }
        }
    }
    
    return cb();
}

module.exports = new Tracker();