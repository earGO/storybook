
/*======================Declare all libraries and middleware and stuff ========================*/
const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 5000,

        //routers
    auth = require('./routers/auth'),

        //middleware imports
    passport = require('passport');

/*====================== Mongoose connections ========================*/

/*====================== Activate middleware ========================*/

/*====================== Global variables ========================*/

//Passport Config
require('./config/passport')(passport)

/*====================== Go routing!!!! ========================*/
app.get('/',(req,res)=>{
    res.send('Server up and running for Storybook')
})

app.use('/auth',auth)

app.get('/dashboard',(req,res)=>{
    res.send('dashboard gonna be here')
})

/*====================== Start an application ========================*/
app.listen(port,()=>{
    console.log(`Storybook App is up on port ${port}`)
})