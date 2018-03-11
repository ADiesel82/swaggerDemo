'use strict';

var http = require("http");
var options = require("../config/app2").app2;

exports.index = function(req, res) {

    var username = false;
    var userData = {};
    if (req.session.user){

        var user = req.session.user;
        try {
            console.log("Logged in");
            sendBalanceRequest(user, function (data) {
                res.render("index", {"user": JSON.stringify(user.login), "userData": JSON.stringify(data)});
            })
        } catch (e) {
            console.log(e);
            res.render("index", {"user": JSON.stringify(user.login), "userData": JSON.stringify(userData)});
        }
    } else {
        res.render("index", {
            "user": username,
            "userData": JSON.stringify(userData)
        });
    }
};

function sendBalanceRequest(user, cb) {
    var userData = {};

    if (!user.token) return userData;

    var reqOptions = Object.assign({}, options,{
        path: "/api/balance/",
        headers: {
            "Content-Type": "application/json",
            "Authorization" :"Bearer " + user.token
        }
    });

    var req = http.request(reqOptions, function (res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            // console.log(output);
            userData = JSON.parse(output);
            cb(userData);
        });
    });

    req.on('error', function (err) {
        console.log(err);
        cb(userData);
    });

    req.end();
}