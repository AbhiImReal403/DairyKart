const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

},{ timestamps: true});

// create model

const Product = mongoose.model('product', productSchema);

module.exports = Product;
