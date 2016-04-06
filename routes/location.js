var express = require('express');
var router = express.Router();
var tracker = require('../models/tracker');

/* Get current location */
router.get('/', function(req, res) {
  tracker.format(function(err, result) {
    res.send(result);
  })
});

/* Remove user from location */
router.delete('/', function(req, res, next) {
  if(!req.body.name) {
    return res.status(400).send({ error: 'name is not defined in body' })
  } else {
    tracker.findAndRemove(req.body.name.toLowerCase().trim(), function(err) {
      if(err) {
        return next(err);
      } else {
        res.send();
      }
    })
  }
})

/* Add user to location */
router.post('/', function(req, res, next) {
  if (!req.body.location) {
    return res.status(400).send({ error: 'location is not defined in body' })
  } else if (!req.body.name) {
    return res.status(400).send({ error: 'name is not defined in body' })
  } else {
    tracker.add(req.body.location, req.body.name.toLowerCase().trim(), function(err) {
      if (err) {
        return next(err);
      } else {
        res.send(req.body);
      }
    });
  }

});

module.exports = router;
