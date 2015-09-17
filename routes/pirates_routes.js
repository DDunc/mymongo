var Pirate = require(__dirname + '/../models/pirate');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var typeRoute = module.exports = exports = express.Router();

typeRoute.get('/pirates', function(req, res, next) {
  Pirate.find({}, function(err, data) {
    if (err) return handleError(error, res);//return the error stuff
    res.json(data);
  });
});

typeRoute.post('/pirates', jsonParser, function(req, res) {
  var newPirate = new Pirate(req.body);
  newPirate.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

typeRoute.put('/pirates/:id', jsonParser, function(req, res) {
  var newPirateBody = req.body;
  delete newPirateBody._id;
  Pirate.update({_id: req.params.id}, newPirateBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'Arr(ay)'});
  });s
});

typeRoute.delete('/pirates/:id', function(req, res) {
  Pirate.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'Arr(ay)'});
  });
});