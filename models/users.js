const mongoose = require('mongoose');
const Photo = require('./photos');

const userSchema = mongoose.Schema({
    name:     {type: String},  
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    photos: [Photo.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;