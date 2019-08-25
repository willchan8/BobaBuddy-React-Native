const mongoose = require('mongoose');

// Schema
const favoriteSchema = mongoose.Schema({
    name: String, 
    url: String, 
    id: String,
    rating: Number,
    review_count: Number,
    distance: Number,
    photos: [String],
    coordinates: {latitude: Number, longitude: Number},
    location: {city: String, address1: String},
});

// Model
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;