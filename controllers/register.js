const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/User');

const User = mongoose.model('users');


//contorollers functions
const
    show = function (req, res) {
    res.render('users/register')
},
    register = function (req, res, next) {
        let errors=[];
        if(req.body.password != req.body.confirmPassword){
            errors.push({text:'Passwords do not match'})
        }
        if(req.body.password.length<4){
            errors.push({text:'Password must be at least 4 characters'})
        }
        if(errors.length>0){
            res.render('users/register',{
                errors:errors,
                name:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email
            })
        } else {
            User.findOne({
                email:req.body.email
            },(err,user)=>{
                if (err){
                    console.log('error connecting to database\n',err)
                } else {
                    if(user){
                        req.flash('error_msg','User with this email already exists');
                        res.redirect('/users/login');
                    } else {
                        let newUser={
                            name:req.body.firstName,
                            email:req.body.email,
                            password:req.body.password,
                            lastName:req.body.lastName,
                            image:req.body.image,
                        }
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(newUser.password, salt, function(err, hash) {
                                if(err){
                                    console.log('error bcrypting password\n',err)
                                } else {
                                    newUser.password = hash;
                                        new User(newUser)
                                            .save()
                                            .then(user=>{
                                                console.log(user)
                                                req.flash('success_msg','Registration successfull! You can login now.')
                                                res.redirect('/users/login')
                                            })
                                            .catch(err=>{
                                                console.log('error adding new user\n',err)
                                            })

                            }
                        });
                    })
                }
            }
        })
    }}


//helper functions on authenticate
const ensureAuthenticated = function (req, res, next) {
}

module.exports = {
    show,
    register
}