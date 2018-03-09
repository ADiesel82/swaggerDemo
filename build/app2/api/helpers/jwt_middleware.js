const passport = require('passport');
const app = require('../../app');
require('../../config/passport')(app, passport);

app.passport = passport;

module.exports = {};

module.exports.jwt = function (req, def, scopes, callback) {
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