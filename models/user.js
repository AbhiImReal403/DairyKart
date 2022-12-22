const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, ' Please enter a Name'],
        lowercase: true,
    },
    email:{
        type: String,
        required: [true, ' Please enter a email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, ' Please enter a email'],
        minlength: [6, 'Minimum Password length is 6 Characters']
    },
});


// fire a function before doc is saved to db
    // hashing the password before saving 


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static methiod to login user

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


const User = mongoose.model('user', userSchema);

module.exports = User;