var Location = require('./location');

var Tracker = function() {
    var self = this;
    self.currentLocations = new Map();
    
    // Initilize current locations
    Location.all().forEach((location) => {
        self.currentLocations.set(location, []);
    })
}

Tracker.prototype.current = function(cb) {
    var result = {};
    this.currentLocations.forEach((people, location) => {
        result[location.name] = people;
    })
    return cb(undefined, result);
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
                    self.currentLocations.get(location).push({name: name})
                    return cb();
                }
            })
        }
    })
}

// Try and find user and remove them;
Tracker.prototype.findAndRemove = function(name, cb) {
    var self = this;
    
    self.currentLocations.forEach((people, key) => {
        people.forEach((person) => {
            if(name === person.name) {
                console.log('Removing ' + name + ' from ' + key);
                self.currentLocations.delete(key);
                return cb();
            }
        })
    })
    
    return cb();
}

module.exports = new Tracker();