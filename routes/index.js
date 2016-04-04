var express = require('express');
var router = express.Router();
var tracker = require('../models/tracker');

/* GET home page. */
var currentLocations = []



router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/location', function(req, res) {
  console.log(tracker.current());
  res.send(tracker.current());
});

router.delete('/location', function(req, res, next) {
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

router.post('/location', function(req, res, next) {
  console.log(req.body);

  if (!req.body.location) {
    return res.status(400).send({ error: 'location is not defined in body' })
  } else if (!req.body.name) {
    return res.status(400).send({ error: 'name is not defined in body' })
  } else {
    console.log('track add');
    tracker.add(req.body.location, req.body.name.toLowerCase().trim(), function(err) {
      if (err) {
        return next(err);
      } else {
        console.log('sending dat body');
        res.send(req.body);
      }
    });
  }

});

module.exports = router;