
/*======================Declare all libraries and middleware and stuff ========================*/
const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 5010,

        //routers
    users = require('./routers/users'),
    policy = require('./routers/policy'),
    index = require('./routers/index'),
    auth = require('./routers/auth'),

        //middleware imports
    passport = require('passport'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash');

/*====================== Load environment variables ========================*/

require('custom-env').env('staging')

const mongoDB = process.env.MONGODB_URI;

/*====================== Mongoose connections ========================*/
//Map global promises to get rid of warning
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect(mongoDB,{ useNewUrlParser:true })
    .then(()=> console.log('MongoDB connected!'))
    .catch(err => console.log('error connecting to MongoDB\n',err));

/*====================== Activate middleware ========================*/
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(flash());
app.use(cookieParser()); //initialize cookie parser JIC

//initialize express-session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

/*====================== Passport config ========================*/
//initialize passport
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport-facebook')(passport)

/*====================== Global variables ========================*/
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})

/*====================== Go routing!!!! ========================*/
app.use('/',index)

/*
//routs for local authorisation and registration
app.use('/users',users)
*/

app.use('/auth',auth)

app.use('/policy',policy)

app.get('/login',(req,res)=>{
    res.send('login page gonna be here')
})


/*====================== Start an application ========================*/
app.listen(port,()=>{
    console.log(`Storybook App is up on port ${port}`)
})