const Favorite = require('./models.js');

addFavorite = (data, callback) => {
	Favorite.findOne(data, (err, result) => {
		if (err) {
			callback(err);
		}
		if (result === null) {
			Favorite.create(data, (err, result) => {
				if (err) {
					callback(err);
				} else {
					callback(null, result);
				}
			});
		}
	});
};

getFavorite = (callback) => {
	Favorite.find({ user: 'Will' }, (err, result) => {
		if (err) {
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

deleteFavorite = (callback) => {
	Favorite.deleteMany({ user: 'Will' }, (err, result) => {
		if (err) {
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

module.exports = {
	addFavorite,
	getFavorite,
	deleteFavorite
};