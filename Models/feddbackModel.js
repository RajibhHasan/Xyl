const mongoose = require('mongoose');

const feddbackSchema = new mongoose.Schema({
    text:String,
    userLocation:Object,
    user:Object
})
    

const feddbackModel= mongoose.model('feddback', feddbackSchema);

module.exports = feddbackModel;
