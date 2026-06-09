'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var houseSchema = new schema({
    photoname: String,
    country: String,
    address: String,
    price: Number,
    description: String,
    active: { type: Boolean, default: true }

})

module.exports = mongoose.model('houses', houseSchema);