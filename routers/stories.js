const express = require('express'),
    router = express.Router(),
    {ensureAuthenticated,ensureGuest} = require('../controllers/auth'),
    addStory = require('../controllers/addStory'),
    showStory = require('../controllers/showStory'),
    editStory = require('../controllers/editStory');


router.get('/', showStory.showPublic)

router.get('/add',ensureAuthenticated, (req, res) => {
    res.render('stories/add')
})

router.post('/',addStory.post)

router.get('/:id/edit',ensureAuthenticated,editStory.edit)
router.put('/:id',ensureAuthenticated,editStory.saveEdited)
router.delete('/:id',ensureAuthenticated,editStory.deleteStory)

//show single story

router.get('/:id', showStory.showOne)

module.exports = router;