'use strict';

var http = require("http");
var options = require("../config/app2");

exports.index = function(req, res) {

    var user = false;
    var userData = {};
    if (req.session.user){

        user = req.session.user.login;
        var userInfo = http.request(options.url+'/', function(res)
        {
            var output = '';
            console.log(options.host + ':' + res.statusCode);
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function() {
                userData = JSON.parse(output);
                console.log(userData);
                res.render("index", {"user": JSON.stringify(user), "userData": JSON.stringify(userData)});
            });
        });

        req.on('error', function(err) {
            console.log(err);
        });

        userInfo.end();
    } else {
        res.render("index", {"user": JSON.stringify(user), "userData": JSON.stringify(userData)});
    }
};