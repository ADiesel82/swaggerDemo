'use strict';

var securePassword = require('secure-password');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/passport');

exports.register = function (req, res) {
    var pwd = securePassword();

    var password = pwd.hashSync(Buffer.from(req.body.password)).toString('utf8');


    var user = new User();
    user.login = req.body.login;
    user.password = password;
    user.token = jwt.sign(user.login, config.secret);

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
            return handleError(res, "Invalid password or username");
        }

        if (pwd.verifySync(Buffer.from(req.body.password), Buffer.from(user.password)) === securePassword.VALID){
            return res.status(200).json({
                "id": user.id,
                "login": user.login,
                "token": user.token
            });
        } else {
            console.log(err);
            return handleError(res, "Invalid password or username");
        }
    });
};

function handleError(res, err) {
    return res.status(400).json({
        "message": err
    });
}