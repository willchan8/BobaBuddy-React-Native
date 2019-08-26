const Favorite = require('./models.js');

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

deleteFavorite = (id, callback) => {
	Favorite.deleteOne({ id: id }, (err, result) => {
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