
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const Track = require('../models/TrackModel.js');

const musicPlayerController = {

	getTrack : function (req res) {
		const id = req.params.id;
		Track.findById(id).then(result => {
			render('musicPlayer', {track: result});
		})
		.catch(err => {
			console.log(err);
		});
	}

};

module.exports = searchTracksController;
/*
	getMusicPlayer : function (req, res) {
		getTrack - query/title of the track to be played
		(db.findOne) - load details track
		renderResult - redirect to music player
		else 404
	}
	
	playPause : function (req, res) {
		play 
		pause
	}

	getNext : function (req, res) {
		(db.findOne) - load details track
		renderResult - redirect to music player
		else 404
	}
	
	getPrev : function (req, res) {
		(db.findOne) - load details track
		renderResult - redirect to music player
		else 404
	}

	insertToPlaylist : function (req, res) {
		(!db.findOne) - if no playlist then
		db.insertOne 
		renderResult - redirect to playlist
		else 404
	}

*/