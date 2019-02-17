const mongoose = require('mongoose')


require('../models/Story');

const Story = mongoose.model('stories');


//contorollers functions
const
    post = function (req, res) {
    res.render('users/login')
}


module.exports = {
    post
}