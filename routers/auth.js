const express = require('express'),
    router = express.Router();

router.get('/google',(req,res)=>{
    res.send('got adress working')
})

router.get('/google/callback',(req,res)=>{
    res.send('got adress working')
})

module.exports = router