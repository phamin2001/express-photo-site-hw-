const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');


//index route
router.get('/',(req, res) => {
    Photo.find({}, (err, allPhotos) => {
        if(err) {
            res.send(err);
        } else {
            res.render('photos/index.ejs', {
                photos: allPhotos
            });
        }
    });
});

// show route
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if(err) {
            res.send(err);
        } else {
            res.render('photos/show.ejs', {
                photo: foundPhoto
            });
        }
    });
});

// delete route
router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
        if(err) {
            res.send(err);
        } else {
            console.log(deletedPhoto, 'This Photo is deleted.');
            res.redirect('/photos');
        }
    });
});


module.exports = router;

