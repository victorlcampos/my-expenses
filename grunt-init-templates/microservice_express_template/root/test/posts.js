'use strict';

var app      = require('./utils').app;
var should   = require('should');
var request  = require('supertest')(app);
var mongoose = app.database;

describe('posts', function () {
  var Post = app.models.post;

  describe('get /posts', function(){
    it('should get all posts', function (done) {
      request
        .get('/posts')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);

          Post.count({}, function(err, count) {
            res.body.length.should.equal(count);
            done();
          });
        });
    });
  });

});