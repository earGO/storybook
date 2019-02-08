const GoogleStrategy = require('passport-google-oauth20').Strategy,
    mongoose = require('mongoose'),
    keys = require('../keys/keys');

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID||process.env.clientID,
            clientSecret:keys.googleClientSecret||process.env.clientSecret,
            callbackURL:'/auth/google/callback',
            proxy:true
        },(accessToken,refreshToken,profile,done)=>{
            console.log(accessToken);
            console.log(profile)
        })
    )
}