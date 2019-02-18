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
            .populate('comments.commentUser')
            .then(story =>{
                if(story.status=='public'){
                    res.render('stories/show',{story:story})
                } else {
                    if(req.user){
                        if(req.user.id == story.user.id){
                            res.render('stories/show',{story:story})
                        } else {
                            res.redirect('/stories')
                        }
                    } else {
                        res.redirect('/stories')
                    }
                }

            })
},
    showPublic = function (req, res) {
        Story.find({status:'public'})
            .populate('user')
            .sort({date:'desc'})
            .then(stories=>{
                res.render('stories/index',{stories:stories})
            })

    },
    showUserStories = function (req, res) {
        Story.find({
            user:req.params.userId,
            status:'public'
        })
            .populate('user')
            .then(stories=>{
                res.render('stories/index',{stories:stories})
            })
    },
    showMyStories = function (req,res) {
        Story.find({
            user:req.params.userId
        })
            .populate('user')
            .then(stories=>{
                res.render('stories/index',{stories:stories})
            })
            .catch(err =>{
                console.log('failed to fetch MyStories\n',err)
            })
    }

module.exports = {
    showOne,
    showPublic,
    showUserStories,
    showMyStories
}