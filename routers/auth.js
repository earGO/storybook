const express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook',
        {
            failureRedirect: '/login',
        scope:[
            'username'
        ]},
        ),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

router.get('/verify',(req,res)=>{
    if(req.user){
        console.log(req.user);
    } else {
        console.log('no auth');
    }
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router