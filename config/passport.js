const FacebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose')
    User = mongoose.model('users');

module.exports = function(passport) {
    //Using local strategy for simplier issues
    passport.use(
        new LocalStrategy({
                usernameFIeld:'email',
                passwordField: 'password',
            },
            function(email,password,done){
                User.findOne({
                    email:email
                }),(err,user)=>{
                    if(err){
                        console.log('error finding user\n',err);
                        return done(err);
                    }
                    if(!user) {
                        return done(null,false,{message:'No user found'});
                    } else {
                        //check do passwords match or not

                    }
                }


            }
        )
    )

    /*//written FACEBOOK passport strategy - couldn't figure out the user-object issue
    //user ibject doesn't pass to global variable and couldn't be used through an app

    passport.use(
        new FacebookStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            profileFields: ['id', 'picture.type(large)', 'name','email','displayName'],
                enableProof: true
        },
        function(accessToken, refreshToken, profile, cb) {
            let givenName = '',
                familyName='',
                facebookEmail=''
            if (profile.name.givenName){
                givenName=profile.name.givenName
                console.log('using facebook profile given name')
            } else {
                givenName = profile.displayName.split(' ')[0]
                console.log('using splitted display name')
            }
            (profile.name.familyName)
                ?familyName=profile.name.familyName
                :familyName=profile.displayName.split(' ')[1];

            (profile.email)
                ?facebookEmail=profile.email
                :facebookEmail='no email listed'
            const newUser={
                facebookID:profile.id,
                firstName:givenName,
                lastName:familyName,
                email:facebookEmail,
                image:profile._json.picture.data.url
            }
            console.log(newUser)
            //check for existing user, and if not - create one
            User.findOne({
                facebookID: profile.id
            },
                (err,user)=>{
                if(err){
                    console.log('user not found, creating one')
                    User.insertOne(newUser,(err,user)=>{
                            if(err){
                                console.log('error creating user\n',err)
                            } else{
                                return cb(err,user)
                            }
                    })
                }else {
                    return cb(err,user)
                }
                })
            }));

    passport.serializeUser((user,cb)=>{
        cb(null,user.id)
    })

    passport.deserializeUser((id,cb)=>{
        User.findById(id).then(user=> cb(null,user))
    })*/
        }
