const express = require('express'),
    router = express.Router();

router.get('/policy',(req,res)=>{
    res.render('policy')
})

router.get()

module.exports = {
    router
}