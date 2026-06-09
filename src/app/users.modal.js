'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var userSchema = new schema({
    firstName:String,
    lastName:String,
    email: String,
    username:String,
    password: String,
    active: {type:Boolean,default:true}

})

module.exports = mongoose.model('users',userSchema);