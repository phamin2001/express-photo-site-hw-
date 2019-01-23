const mongoose = require('mongoose');

// require('mongoose-type-url');

const photoShema = mongoose.Schema({
    title: {type: String, require: true},
    // url:   {source: mongoose.SchemaTypes.Url}
    description: {type: String},
    url: {type: String, request: true, unique: true}
});

const Photo = mongoose.model('Photo', photoShema);

module.exports = Photo;