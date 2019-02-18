const mongoose = require('mongoose'),
    passport = require('passport');

require('../models/Story');

const Story = mongoose.model('stories');

//contorollers functions
const
    edit = function (req, res) {
        Story.findOne({
            _id:req.params.id
        })
            .then(story =>{
                if(story.user != req.user.id){
                    res.redirect('/stories')
                }else {
                    res.render('stories/edit',{story:story})
                }
            })
},
    saveEdited = function(req,res){
        Story.findOne({_id:req.params.id})
            .populate('user')
            .then(story =>{
                //translating allow-comments from HTML-form to database format
                let allowComments;
                if(req.body.allowComments){
                    allowComments = true
                } else {
                    allowComments = false;
                }
                //modify a story item fields
                    story.title = req.body.title;
                        story.body = req.body.body;
                story.status = req.body.status;
                story.allowComments = allowComments;

                //save new story to database
                story.save()
                    .then(story=>{
                        res.redirect('/dashboard')
                    })
            })
    },

    deleteStory = function (req, res) {
    Story.deleteOne({_id:req.params.id})
        .then(() =>{
                res.redirect('/dashboard')
            })
}


//helper functions on authenticate
const ensureAuthenticated = function (req, res, next) {
}

module.exports = {
    edit,
    deleteStory,
    saveEdited,
    ensureAuthenticated
}