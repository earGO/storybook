const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/User');
require('../models/Story');

const User = mongoose.model('users');
const Story = mongoose.model('stories');

//contorollers functions
const
    showDash = function (req, res) {
        Story.find({user:req.user.id})
            .then(stories=>{
                res.render('index/dashboard',{stories:stories})
            })

}

module.exports = {
    showDash
}