const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    stock: Number,
    price: Number,
    year: Number,
    runtime: Number,
    plot: String,   
    rated: String,
    released: String,
    genre: String,
    director: String,
    writer: String,
    actors: String,
    language: String,
    country: String,
    awards: String,
    cardimg: String,
    posterimg: String,
    bannerimg: String,
    urltrailer: String  
}, { 
    versionKey: false
});

module.exports = mongoose.model('movies', productSchema);