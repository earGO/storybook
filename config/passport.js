const FacebookStrategy = require('passport-facebook').Strategy,
    mongoose = require('mongoose');

module.exports = function(passport) {
    passport.use(new FacebookStrategy({
            clientID: process.env.facebook_ID,
            clientSecret: process.env.facebook_Secret,
            callbackURL: "https://mysterious-tor-14902.herokuapp.com/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
        console.log(accessToken)
            console.log(profile)
            // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
        }
    ));
}