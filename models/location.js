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

// Gets an array of all locations
Location.all = function() {
    return locations;
}

Location.findById = function(id, cb) {
    return cb(undefined, locations[id]);
}

Location.findByName = function(name, cb) {
    var trimmedName = name.toLowerCase().trim();
    for(var key in locations) {
        if(locations.hasOwnProperty(key)) {
            var location = locations[key];
            if(trimmedName === location.name) {
                return cb(undefined, location);
            }
        }
    }
    
    return cb();
}

module.exports = Location;
