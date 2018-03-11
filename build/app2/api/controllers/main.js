'use strict';

var User = require('../models/user');

module.exports = {
    getUserBalance: getUserBalance,
    fillWithTestData: fillWithTestData
};

function getUserBalance(req, res) {
    console.log(req.username);
    if (req.username) {
        User.findOne({"username": req.username}, function (err, data) {
            if (err) {
                console.log(err);
                // return handleError(res, "Invalid password or username");
                return res.status(500).json({
                    "message": "Some error occurred"
                });
            }
            console.log(data);
            return res.json({
                "username": data.username,
                "balance": data.balance,
                "currency": data.currency
            });
        });
    } else {
        return res.status(401).json({'message': 'User not found'})
    }
}

function fillWithTestData(req, res) {
    var currencies = ['usd', 'eur'];
    var users = [];
    for (var i=1; i<=100; i++){
        var user = new User();
        user.username = 'user'+i;
        var randNum = Math.random() * 1000;
        user.balance = randNum.toFixed(3);
        user.currency = currencies[Math.floor(Math.random()*2)];
        user.save(function (err, data) {
            if (err) {
                console.log(err);
                // return res.status(500).json({'message': 'Some error occured'})
            }
            users.push(data);
        });
    }
    return res.status(200).json(users);

}
