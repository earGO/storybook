const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    register = require('../controllers/register');

router.get('/facebook',
    passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router