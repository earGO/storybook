const express = require('express'),
    router = express.Router(),
    passport = require('passport')

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });
router.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success_msg','You are logged out! See ya!')
    res.redirect('/')
})

module.exports = router