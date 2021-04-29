
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

const searchTracksController = {

	getAllTracks : function (req, res) {
		Track.find().then(result => {
			// tracks must be in hbs (tracks.title, tracks.image, etc.)
			res.render('searchTracks', {tracks: result});
		})
		.catch(err => {
			console.log(err);
		});
	},

	getTrack : function (req, res) {
		Track.findOne({title: req.query.search}, (err, result) => {
			res.render('/searchTracks?username' + username, {tracks: result});
		}); 
	}
	
};

module.exports = searchTracksController;

/*
	getTracks : function (req, res) {
		getUserQuery
		(db.findOne)
		render - redirect to tracks but with searched tracks only
	}
*/