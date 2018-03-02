'use strict';

var securePassword = require('secure-password');
var Points = require('../models/user');

module.exports = {
    register: async function (req, res) {
        var pwd = securePassword();

        await pwd.hash(userPassword, function (err, hash) {
            if (err) throw err
        });

        Points.find(function (err, data) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(data);
        }).sort('-created');
    },
    handleError: function (res, err) {
        return res.status(400).json(JSON.stringify(err));
    }
};