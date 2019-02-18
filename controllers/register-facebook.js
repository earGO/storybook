const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/User');

const User = mongoose.model('users');


//contorollers functions
const
    show = function (req, res) {
    res.render('users/register')
}

module.exports = {
    show
}