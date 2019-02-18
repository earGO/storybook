const express = require('express'),
    router = express.Router(),
    {ensureAuthenticated,ensureGuest} = require('../controllers/auth'),
    dash = require('../controllers/dashboard');



router.get('/',ensureGuest,(req,res)=>{
    res.render('index/welcome')
})

router.get('/dashboard',ensureAuthenticated,dash.showDash)

router.get('/about',(req,res)=>{
    res.render('index/about')
})

module.exports = router;