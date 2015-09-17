var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/my_mongo');

var pirateRouter = require(__dirname + '/routes/pirates_routes');

app.use('/ship', pirateRouter); //pirates go where they want

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('I am listening on port' + port);
})