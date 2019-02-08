const express = require('express'),
    router = express.Router();

router.get('/auth/facebook',
    passport.authenticate('facebook'));
})

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router