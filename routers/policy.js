const express = require('express'),
    router = express.Router();

router.get('/',(req,res)=>{
    res.render('policy')
});

router.get('/agreement', (req, res) => {
    res.render('agreement')
});

module.exports = router