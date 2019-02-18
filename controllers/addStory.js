const mongoose = require('mongoose')

require('../models/Story');

const Story = mongoose.model('stories'),
    User = mongoose.model('users');


//contorollers functions
const
    post = function (req, res) {
        let allowComments;
        if(req.body.allowComments){
            allowComments = true
        } else {
            allowComments = false;
        }

        const newStory = {
            title:req.body.title,
            body:req.body.body,
            status:req.body.status,
            allowComments:allowComments,
            user:req.user.id
        }

        new Story(newStory)
            .save()
            .then(story => {
                console.log('new story:\n',story);
                res.redirect(`stories/${story._id}`);
            })
}


module.exports = {
    post
}