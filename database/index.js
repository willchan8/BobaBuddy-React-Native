const mongoose = require('mongoose');
const Favorite = require('./models.js');

mongoose.connect('mongodb://localhost/BobaBuddy', {useNewUrlParser: true});

mongoose.connection.on('error', () => {
  console.log('mongoose connection error');
});

mongoose.connection.once('open', () => {
  console.log('mongoose connected successfully');
});

// Controllers
addFavorite = (favorite, callback) => {
  Favorite.create(favorite, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

getFavorite = (callback) => {
	Favorite.find({}, (err, result) => {
		if (err) {
			callback(err);
		} else {
      callback(null, result);
		}
	});
};

deleteFavorite = (callback) => {
	Favorite.deleteMany({ user: 'Will' }, (err, result) => {
		if (err) {
			callback(err);
		} else {
			callback(null, result);
		}
	});
};

module.exports = {
	addFavorite,
	getFavorite,
	deleteFavorite
};