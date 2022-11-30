const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username:{
        type: String,
        required: true,
        trim: true,
        maxLength: 25,
        unique: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXAS-s6-wcK3enD1Z6kuBGONuyTKR6M5a3KeAI9w_ACQ&s'
    },
    role:{
        type: String,
        default: 'user'
    },
    gender:{
        type: String,
        required: 'male'
    },
    mobile: {
        type: String, default: ''
    },
    address:{
        type: String,
        default: ''
    },
    story:{
        type: String,
        default: '',
        maxLength: 200
    },
    website:{
        type: String,
        default: ''
    },
    followers:[{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
],
    following:[{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
],
saved: [{type: mongoose.Types.ObjectId, ref: 'user'}]
    
},{
    timestamps: true
})



const Users = new mongoose.model('user',userSchema);

module.exports = Users;