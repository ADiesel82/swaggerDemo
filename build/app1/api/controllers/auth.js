'use strict';

var securePassword = require('secure-password');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../../config/passport');

exports.register = function (req, res) {
    var pwd = securePassword();

    var password = pwd.hashSync(Buffer.from(req.body.password)).toString('utf8');


    var user = new User();
    user.login = req.body.login;
    user.password = password;
    user.token = jwt.sign(user.login, config.secret);
    //TODO:add expire date

    user.save(function (err, data) {
        if (err) {
            console.log(err);
            return handleError(res, "An error occurred");
        }
        return res.status(200).json({
            "message": 'OK'
        });
    });
};

exports.login = function (req, res) {
    var pwd = securePassword();

    User.findOne({"login": req.body.login}, function (err, user) {
        if (err) {
            console.log(err);
            // return handleError(res, "Invalid password or username");
            return res.status(401).json({
                "auth": false,
                "token": null
            });
        }

        if (pwd.verifySync(Buffer.from(req.body.password), Buffer.from(user.password)) === securePassword.VALID){
//TODO: verify if expired, generate new

            req.session.user = user;

            return res.status(200).json({
                "auth": true,
                "token": user.token
            });
        } else {
            return res.status(401).json({
                "auth": false,
                "token": null
            });
        }
    });
};

exports.logout = function(req, res) {
    req.session.destroy(function(){
        res.status(200).send({ auth: false, token: null });
    });
};

function handleError(res, err) {
    return res.status(400).json({
        "message": err
    });
}