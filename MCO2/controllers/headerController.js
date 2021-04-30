// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

const headerController = {

	getHome: function (req, res) {

		const tracks = db.findMany(Track, {username: req.body.username}, '', function (flag) {});

		res.render('searchTracks', tracks);
	},

	getProfile: function (req, res) {
		
		const user = db.findOne(User, {username: req.body.username}, '', function (flag) {});

		res.render('profile-info', user);
	},

	getUpload: function (req, res) {
		res.render('upload');
	},

	getLogOut: function (req, res) {
		res.render('login');
	}


};

module.exports = headerController;
/*

	
	// if search bar has no value then show default songs
	// else show with filter added
	getHome : function (req, res) {
		render - redirect to search tracks 
		else 404	
	}
*/