const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
	user: String,
	name: String,
	metadata: Array
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;