const { Router } = require('express');
const express = require('express');

const router = express.Router();

const productsController = require('../controller/productsController');


router.get('/', productsController.blog_index);


// router.get('/',(req, res) => {
//     // res.status(200).send('</h1>product route loaded</h2>');
//     console.log(req.url);
// })


router.get('/:id',(req, res) => {
    const id = req.params.id;
    // res.send(id);
    
    res.render('plainTemplate');
    console.log(req.url);
})


module.exports = router;