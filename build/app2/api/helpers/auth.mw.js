var jwt = require('jsonwebtoken');
var config = require('../../config/passport');


module.exports = {};

function getToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports.jwt = function (req, def, scopes, callback) {
    var token = getToken(req);

    try {
        var username = jwt.verify(token, config.secret);

        if (!username) {
            var err = new Error('Authentication failed');
            err.status = 401;
            // err.setHeader('Content-type', 'application/json');
            return callback(err);
        }

        req.username = username;
        return callback();
    } catch(err) {
        err.status = 500;
        return callback(err);
    }



    var pass = passport.authenticate('jwt', { session: false}, function(error, user, info) {
        if (error) {
            var err = new Error('Error in JWT authentication process');
            err.status = 500;
            return callback(err);
        }

        if (!user) {
            var err = new Error('Authentication failed,: ' + info);
            err.status = 401;
            return callback(err);
        }

        req.user = user;
        return callback();
    });

    pass(req, null, callback);
};