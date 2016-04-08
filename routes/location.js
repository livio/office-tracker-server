var express = require('express');
var router = express.Router();
var Location = require('../models/location')
var tracker = require('../models/tracker');

/* Get current location */
router.get('/', function(req, res) {
  tracker.format(function(err, result) {
    res.send(result);
  })
});

/* Remove user from location */
router.delete('/', function(req, res, next) {
  if (!req.body.name) {
    return res.status(400).send({ error: 'name is not defined in body' })
  } else {
    tracker.remove(req.body.name.toLowerCase().trim(), function(err, result) {
      if (err) {
        return next(err);
      } else {
        res.send({ success: result });
      }
    })
  }
})

/* Add user to location */
router.post('/', checkBody, checkLocationExists, function(req, res, next) {
  tracker.add(req.body.location, req.body.name.toLowerCase().trim(), function(err) {
    if (err) {
      return next(err);
    } else {
      res.send(req.body);
    }
  });
});

function checkBody(req, res, next) {
  if (!req.body.location) {
    return res.status(400).send({ error: 'location is not defined in body' })
  } else if (!req.body.name) {
    return res.status(400).send({ error: 'name is not defined in body' })
  } else {
    next();
  }
}

function checkLocationExists(req, res, next) {
  Location.findById(req.body.location, function(err, location) {
    if(err) {
      return next(err);
    } else if(location) {
      return next();
    } else {
      return res.status(400).send({ error: 'location with id ' + req.body.location  + ' does not exist'})
    }
  })
}

module.exports = router;
