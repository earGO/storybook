const mongoose = require('mongoose'),

    UserSchema = new mongoose.Schema({
        facebookID:{
            type:String,
            required:true
        },
        firstName:String,
        email:{
            type:String,
            required:true
        },
        lastName:String,
        image:String

    })

mongoose.model('users',UserSchema)

