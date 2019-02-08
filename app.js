
/*======================Declare all libraries and middleware and stuff ========================*/
const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 5000,

        //routers
    auth = require('./routers/auth'),
    policy = require('./routers/policy'),

        //middleware imports
    passport = require('passport'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars');

/*====================== Mongoose connections ========================*/

/*====================== Activate middleware ========================*/
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


/*====================== Global variables ========================*/

//Passport Config

/*====================== Go routing!!!! ========================*/
app.get('/',(req,res)=>{
    res.render('index')
})

//verify domain
app.get('/verify',(req,res)=>{
    res.redirect('./config/googlebc0d0191d7bb8bf0.html')
})

app.use('/auth',auth)

app.use('/policy',policy)

app.get('/dashboard',(req,res)=>{
    res.send('dashboard gonna be here')
})

/*====================== Start an application ========================*/
app.listen(port,()=>{
    console.log(`Storybook App is up on port ${port}`)
})