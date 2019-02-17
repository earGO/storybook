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
        req.flash('error_msg','Not authorized, login please');
        res.redirect('/')
    }
},
    ensureGuest = function (req, res, next) {
        if(req.isAuthenticated()){
            res.redirect('/dashboard')

        } else {
            return next();
        }
    }

module.exports = {
    show,
    authenticate,
    logout,
    ensureAuthenticated,
    ensureGuest
}