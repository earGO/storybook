const express = require('express'),
    router = express.Router(),
    {ensureAuthenticated,ensureGuest} = require('../controllers/auth'),
    addStory = require('../controllers/addStory');

router.get('/', (req, res) => {
    res.render('stories/index')
})

router.get('/add',ensureAuthenticated, (req, res) => {
    res.render('stories/add')
})

router.post('/',addStory.post)

router.get('/edit',ensureAuthenticated, (req, res) => {
    res.render('stories/edit')
})

router.get('/:id',ensureAuthenticated, (req, res) => {
    res.render('stories/show')
})

module.exports = router;