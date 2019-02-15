const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/User');

const User = mongoose.model('users');


//contorollers functions
const
    //render Login page
    show = function (req,res,next) {
    res.render('users/login')
},

    //authenticate user
    authenticate = function (req,res,next) {
        passport.authenticate('local',{
            successRedirect:'/',
            failureRedirect:'/users/login',
            failureFlash:true
        })(req,res,next);
    },
    logout = function(req,res){
        req.logout()
        req.flash('success_msg','You are logged out! See ya!')
        res.redirect('/users/login')
    }


//helper functions on authenticate
const ensureAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg','not authorized');
        res.redirect('/users/login')
    }
}

module.exports = {
    show,
    authenticate,
    logout,
    ensureAuthenticated
}