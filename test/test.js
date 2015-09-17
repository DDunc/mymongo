'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/pirate';
var mongoose = require('mongoose');
var Pirate = require(__dirname + '/../models/pirate');
var Zombie = require(__dirname + '/../models/zombie');
require(__dirname + '/../server.js');
var url = 'localhost:3000/api';

describe('the pirates resource', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to get pirates', function(done) {
    chai.request(url)
      .get('/pirates')
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });

  it('should be able to create a pirate', function(done) {
    chai.request(url)
      .post('/pirates')
      .send({stats: [5,5], name: "Bluebeard", favShanty: "99 Bottles"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.favShanty).to.eql("99 Bottles");
        expect(res.body.name).to.eql('BlueBeard');
        expect(res.body.stats).to.eql([5,5]);
        done();
      });
  });

  describe('routes that need a resource in the database', function() {
    beforeEach(function(done) {
      var testPirate = new Pirate({stats: [6,6], name: "Cpt. Crunch"});
      testPirate.save(function(err, data) {
        if (err) throw err;
        this.testPirate = data;
        done();
      }.bind(this));
    });

   it('should be able to update a pirate', function(done) {
      chai.request(url)
        .put('//' + this.testPiate._id)
        .send({isZombie: 'true'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Arr(ay');
          done();
        });
   });

   it('should be able to delete a pirate', function(done) {
      chai.request(url)
        .delete('/pirates/' + this.testPirate._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Arrr(ay');
          done();
        });
   });

  });
});