require('./db/db');

const express = require('express');
const app = express();

const photosController = require('./controllers/photos');
app.use('/photos', photosController);

// const mongooseTypeUrl = require('mongoose-type-url');
// app.use(mongooseTypeUrl());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.listen(3000, () => {
    console.log('Mongoose is running on port 3000');
});