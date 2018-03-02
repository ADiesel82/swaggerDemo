'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var helmet = require('helmet');
app.use(helmet());
module.exports = app; // for testing

var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect("mongodb://localhost:27017/swaggerDemo");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB Connected");
});



var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/api']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/api');
  }
});
