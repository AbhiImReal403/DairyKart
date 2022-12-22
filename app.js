const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const fs = require('fs');
const { render } = require('ejs');

const productsData = require('./products.json');

const productRoutes = require('./routes/productRoutes')

const authRoutes = require('./routes/authRoutes')

const Product = require('./models/product');
const cookie = require('cookie-parser');
const config = require('./config/index');
// express app

const app = express();

// connect to MongoDb


mongoose.set('strictQuery',true);

const dbURI = `mongodb+srv://${config.usr}:${config.pass}@${config.db_url}/dairy-app?retryWrites=true&w=majority`;
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000);
        console.log('connected');
    })
    .catch((err) => console.log(err));

// regeister view engine

app.set('view engine', 'ejs');


// Middleware

// static file

// app.use(express.static('public'));
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

// retrive data from forms

app.use(express.urlencoded({ extended: true}));

app.use(express.json());
app.use(cookie());



// routes

// home

app.get('/',(req, res) => {
    res.render('index');
});

// cart


app.get('/cart',(req, res) => {
    res.render('cart');
});

app.use('/product',productRoutes);
app.use(authRoutes);


// app.get('/product',(req, res) => {
//     console.log(req.url);
//     productRoutes(req, res);
// });



// products api

app.get('/products', (req, res) => {
    Product.find()
        .then(result => {
        //   res.render('index', { blogs: result, title: 'All blogs' });
        res.json(result);
        })
        .catch(err => {
        console.log(req);
        console.log(err);
        });
    // res.json(productsData);
})




// 404 page

app.use((req,res) => {
    res.status(404).render('404');

});

