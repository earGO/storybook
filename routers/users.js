const express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.get('/facebook',(req,res,next)=>{
        passport.authenticate('facebook')(req,res,next)
}
    );


module.exports = router