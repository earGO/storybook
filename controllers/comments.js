const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/Story');

const Story = mongoose.model('stories');


//contorollers functions
const
    postComment = function (req, res) {
        Story.findOne({
            _id:req.params.id
        })
            .then(story=>{
                const newComment={
                    commentBody: req.body.commentBody,
                    commentUser: req.user.id
                }
                //unshift pushes new item in the beggining of an array, whereas the push - to the end
                story.comments.unshift(newComment)

                story.save()
                    .then(story=>{
                        res.redirect(`/stories/${story._id}`)
                    })
            })
}


module.exports = {
    postComment
}