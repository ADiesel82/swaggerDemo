'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

module.exports = app; // for testing

var config = {
    appRoot: __dirname, // required config
    swaggerSecurityHandlers: {
        jwt: require('./api/helpers/auth.mw').jwt
    }
};


var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect("mongodb://mongo:27017/app2");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB Connected");
});

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
