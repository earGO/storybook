const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/Story');

const Story = mongoose.model('stories');


//contorollers functions
const
    showOne = function (req, res) {
        Story.findOne({_id:req.params.id})
            .populate('user')
            .then(story =>{
                console.log(story)
                res.render('stories/show',{story:story})
            })
},
    showPublic= function (req, res) {
        Story.find({status:'public'})
            .populate('user')
            .then(stories=>{
                res.render('stories/index',{stories:stories})
            })

    }

module.exports = {
    showOne,
    showPublic
}