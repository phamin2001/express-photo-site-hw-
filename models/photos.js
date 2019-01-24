const mongoose = require('mongoose');


const photoSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String},
    url: {type: String, request: true}
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;