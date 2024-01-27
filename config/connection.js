const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nandhuknair27:LQXPHqUIi0bejOif@cluster0.ntsuwkr.mongodb.net/otpgenrator')
.then(()=> console.log("Connected to database"))
.catch((err)=> console.log("An error occur while connecting to db",err))
