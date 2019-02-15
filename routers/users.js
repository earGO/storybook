const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    auth = require('../controllers/auth'),
    register = require('../controllers/register');

router.get('/login',auth.show);

router.get('/register',register.show);

router.post('/login',auth.authenticate)

router.post('/register',register.register)

module.exports = router