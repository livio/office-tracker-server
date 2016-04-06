var Location = function(id, name) {
    this.id = id;
    this.name = name.toLowerCase().trim();
}

// Hard-coded locations
var locations = [
    new Location(1, 'justin\'s office'),
    new Location(2, 'corey\'s desk'),
    new Location(3, 'conference room')
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
