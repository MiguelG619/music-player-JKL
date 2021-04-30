
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const Track = require('../models/TrackModel.js');

const editTracksController = {

	updateTrack: function (req, res) {
		const profile = new User(req.body);

		profile.save().then(result => {
			res.redirect('profileInfo')
		})
		.catch(err => {
			console.log(err);
		});
	},

	
};

module.exports = editTracksController;
/*
	updateTrack : function (req, res) {
		getTrackDetails - query of the request
		(db.updateOne) 
		renderResult - redirect to search tracks
		else 404
	}
*/