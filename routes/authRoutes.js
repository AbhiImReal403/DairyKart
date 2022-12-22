const express = require('express');

const authController = require('../controller/authController')


const router = express.Router();

router.get('/login', (req, res) => {

})
router.get('/signup', (req, res) => {

    res.render('signup',{
        pageName: req.url
    })
    // console.log(req.url);
})
router.post('/signup', authController.signup_post)

router.post('/login', authController.login_post);

module.exports = router;