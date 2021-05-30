const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/myNewDatabase",{useNewUrlParser:true, useUnifiedTopology: true });

const user = mongoose.model('User',{
    username:String,
    email:String, 
    password:String
})

module.exports = {user}