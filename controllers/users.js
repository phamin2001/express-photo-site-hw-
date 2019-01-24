const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Photo = require('../models/photos');

// index route
router.get('/', (req, res) => {
    User.find((err, findUsers) => {
        if(err) {
            res.send(err);
        } else {
            res.render('users/index.ejs', {
                users: findUsers
            })
        }
    });
});

// new rute
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// create route
router.post('/', (req, res) =>{
    User.create(req.body, (err, createdUser) => {
        if(err) {
            res.send(err);
        } else{
            res.redirect('/users');
        }
    });
});

// edit route
router.get('/:id/edit',(req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err) {
            res.send(err);
        } else {
            res.render('photos/edit.ejs', {
                user: foundUser
            })
        }
    });
});

// update route
router.put('/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        if(err) {
            res.send(err);
        } else {
            console.log(updatedUser);
            res.redirect('/users');
        }
    });
});

// show route
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err) {
            res.send(err);
        } else {
            res.render('users/show.ejs', {
                user: foundUser
            })
        }
    });
});

// delete route
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if(err) {
            res.send(err);
        } else {
            console.log(deletedUser, 'This user is deleted.');
            res.redirect('/users');
        }
    });
});

module.exports = router;