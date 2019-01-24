const express = require('express');
const router = express.Router();
const User = require('../models/users');

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



module.exports = router;