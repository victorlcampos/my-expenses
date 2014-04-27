
/**
 * Module dependencies.
 */

var express = require('express');
var http    = require('http');
var load    = require('express-load');
var db      = require('mongoose'),
    dbUrls  = require('./config/database');
var app     = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.database = db.connect(dbUrls[process.env.NODE_ENV || "development"]);

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

exports.app = app