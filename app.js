var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var locations = require('./routes/location');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/location', locations);

module.exports = app;
