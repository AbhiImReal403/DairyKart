const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { json } = require('express');

const handleErrors = err => {
    // console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // duplicate error code

    if(err.code === 11000){
        errors.email = ' that email is already registered';
        return errors;
    }

    // incorrect email
    
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
    }
    
    
    
    // incorrect password


    if(err.message === 'incorrect password'){
        errors.email = 'the password is incorrect ';
    }
    
    
    
    // validation errors

    if(err.message.includes('user validation failed')){
        
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    
    return errors;

}

// create token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {

    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    });

}



module.exports.login_post = async (req, res) => {
    const { email , password } = req.body;


    try {
        
        const user = await User.login(email, password);
        res.status(200),json({ user: user._id})
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({user: user._id });
    } catch (err) {
        console.log(err);
        // const errors = handleErrors(err);
        // res.status(400).json({ errors });
    }


}

module.exports.signup_post = async (req, res) => {
    const { email , password, name} = req.body;


    try {
        const user = await User.create({  name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({user: user._id });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}