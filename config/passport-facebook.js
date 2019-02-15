const
    FacebookStrategy = require('passport-facebook').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('users');

module.exports = function(passport) {
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
                givenName = profile.displayName.split(' ')[0];
                console.log('using splitted display name')
            }
            (profile.name.familyName)
                ?familyName=profile.name.familyName
                :familyName=profile.displayName.split(' ')[1];

            (profile.email)
                ?facebookEmail=profile.email
                :facebookEmail='no email listed';

            const newUser={
                facebookID:profile.id,
                firstName:givenName,
                lastName:familyName,
                email:facebookEmail,
                image:profile._json.picture.data.url
            }
            console.log('created newUser from request\n',newUser)
            //check for existing user, and if not - create one
            User.findOne({
                facebookID: newUser.facebookID
            }).then(user=>{
                if(user){
                    //return the result of authentucation
                    return cb(null,user)
                } else {
                    //create new User
                    new User(newUser)
                        .save()
                        .then(user => { return cb(null,user)})
                        .catch(err=>console.log('error creating user\n',cb(err)))

                }
            })
        }));

    passport.serializeUser((user,cb)=>{
        cb(null,user.id)
    })

    passport.deserializeUser((id,cb)=>{
        User.findById(id).then(user=> cb(null,user))
    })
        }
