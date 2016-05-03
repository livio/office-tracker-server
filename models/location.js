var Location = function(id, name) {
    this.id = id;
    this.name = name.toLowerCase().trim();
}

// Hard-coded locations
var locations = [
    new Location(1, 'conference room'),
    new Location(2, 'kitchen'),
    new Location(3, 'hallway'),
    new Location(4, 'back'),
    new Location(5, 'Lab')
]

// Returns an array of all locations
Location.all = function() {
    return locations;
}

// Finds a single location by ID
Location.findById = function(id, cb) {
    for(var i = 0; i < locations.length; i++) {
        var location = locations[i];
        if(location.id == id) {
            return cb(undefined, location);
        }
    }
    
    return cb();
}

module.exports = Location;
