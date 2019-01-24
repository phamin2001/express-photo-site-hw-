const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');
const User = require('../models/users');

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

// new route
router.get('/new', (req, res) => {
    User.find({}, (err, allUsers) => {
        res.render('photos/new.ejs', {
            users: allUsers
        })
    });
});

// create route
router.post('/', (req, res) => {
    User.findById(req.body.userId, (err, foundUser) => {
        Photo.create(req.body, (err, createdPhoto) => {
            if(err) {
                res.send(err);
            } else {
                foundUser.photos.push(createdPhoto);
                foundUser.save((err, newData) => {
                    res.redirect('/photos');
                });
            }
        });
    });
})

// edit route
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, foundedPhoto) => {
        if (err) {
            res.send(err);
        } else {
            res.render('photos/edit.ejs', {
                photo: foundPhoto
            })
        }
    });
});

// update route
router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
        if(err) {
            res.send(err);
        } else {
            console.log(updatedPhoto);
            res.redirect('/photos');
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

