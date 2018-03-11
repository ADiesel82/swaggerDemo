'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var helmet = require('helmet');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(helmet());
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({secret: "aRTpUkviZyYxOKwh4Fuvlhz2dlS3h9Sx", cookie: { maxAge: 6000000 }, resave: true, saveUninitialized: true}));

module.exports = app; // for testing

module.exports.checkSignIn = function(req, res){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
};

var indexController = require('./controllers/index');
app.get('/', indexController.index);


var mongoose = require('mongoose');
var db = mongoose.connection;
//TODO: change host to mongo
mongoose.connect("mongodb://mongo:27017/app1");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB Connected");
});


var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
      throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10001;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/api']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/api');
  }
});
