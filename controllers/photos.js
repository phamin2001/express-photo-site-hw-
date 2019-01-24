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
    Photo.findById(req.params.id, (err, foundPhoto) => {
        User.find({}, (err, allUsers) => {
            User.findOne({'photos._id': req.params.id}, (err, photoUser) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render('photos/edit.ejs', {
                        photo: foundPhoto,
                        users: allUsers,
                        photoUser: photoUser
                    })
                }
            });
        });
    });
});

// update route
router.put('/:id', (req, res) => {
    Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            if(foundUser._id.toString() !== req.body.userId) {
                foundUser.photos.id(req.params.id).remove();
                foundUser.save((err, savedFoundUser) => {
                    User.findById(req.body.userId, (err, newUser) => {
                        newUser.photos.push(updatedPhoto);
                        newUser.save((err, savedNewUser) => {
                            res.redirect('/photos/' + req.params.id);
                        });
                    });
                });
            } else {
                foundUser.photos.id(req.params.id).remove();
                foundUser.photos.push(updatedPhoto);
                foundUser.save((err, data) => {
                    if(err) {
                        res.send(err);
                    } else {
                        res.redirect('/photos/' + req.params.id);
                    }
                });
            }
        }); 
    });
});

// show route
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            if(err) {
                res.send(err);
            } else {
                res.render('photos/show.ejs', {
                    photo: foundPhoto,
                    user: foundUser
                });
            }
        });
    });
});

// delete route
router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id, (err, deletedPhoto) => {
        User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
            foundUser.photos.id(req.params.id).remove();
            foundUser.save((err, data) => {
                if(err) {
                    res.send(err);
                } else {
                    res.redirect('/photos');
                } 
            })
        });
    });
});


module.exports = router;

