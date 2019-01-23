const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');


//index route
router.get('/',(req, res) => {
    Photo.find({}, (err, allPhotos) => {
        if(err) {
            res.send(err);
        } else {
            res.render('photos/index.ejs');
        }
    });
});

module.exports = router;

