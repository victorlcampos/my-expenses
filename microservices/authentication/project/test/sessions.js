'use strict';

var app      = require('./utils').app;
var should   = require('should');
var request  = require('supertest').agent(app);
var mongoose = app.database;

describe('sessions', function () {
  describe('get /auth/current_user', function(){
    describe('with not logged user', function() {
      it('should reseive 400', function (done) {
        request
          .get('/auth/current_user')
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            res.text.should.equal("Not logged in");
            done();
          });
      });
    });
  });
});