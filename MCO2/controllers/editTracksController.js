
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const Track = require('../models/TrackModel.js');

const editTracksController = {

	updateTrack : function (req, res) {
		let title = req.query.title;
		let description = req.query.description;

		db.updateOne(Track, )
        // playlistName[0]: playlist?
    };
	}
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