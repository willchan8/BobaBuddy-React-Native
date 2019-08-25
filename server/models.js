const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
	data: Array
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;