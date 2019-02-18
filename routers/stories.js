const express = require('express'),
    router = express.Router(),
    {ensureAuthenticated,ensureGuest} = require('../controllers/auth'),
    addStory = require('../controllers/addStory'),
    showStory = require('../controllers/showStory'),
    editStory = require('../controllers/editStory'),
    comments = require('../controllers/comments');


router.get('/', showStory.showPublic);

router.get('/add',ensureAuthenticated, (req, res) => {
    res.render('stories/add')
})

router.post('/',addStory.post);

router.get('/:id/edit',ensureAuthenticated,editStory.edit);
router.put('/:id',ensureAuthenticated,editStory.saveEdited);
router.delete('/:id',ensureAuthenticated,editStory.deleteStory);

//show single story
router.get('/:id', showStory.showOne);
//list all stories from user
router.get('/user/:userId', showStory.showUserStories);

//show all MY stories
router.get('/mystories/:userId',ensureAuthenticated,showStory.showMyStories);

//comments routers
router.post('/comments/:id',ensureAuthenticated,comments.postComment);


module.exports = router;