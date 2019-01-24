const express = require('express');
const router = express.Router();
const User = require('../models/users');

//index route
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




module.exports = router;