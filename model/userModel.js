const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required: true
    },
    number: {
        type:Number,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    otpCreatedAt:{
        type: Date
    },
    isVerified: {
        type: Boolean,
        default:false
    },

});

const User = mongoose.model('User',userSchema);
module.exports = User