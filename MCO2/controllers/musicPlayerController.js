
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const Track = require('../models/TrackModel.js');

// const musicPlayerController = {
/*
	redirectToMusicPlayer : function (req, res) {
		getTrack - query of the request
		(db.findOne) - load details track
		renderResult - redirect to music player
		else 404
	}
	
	playPause : function (req, res) {
		play 
		pause
	}

	next : function (req, res) {
		(db.findOne) - load details track
		renderResult - redirect to music player
		else 404
	}

	addToPlaylist : function (req, res) {
		(!db.findOne) - if no playlist then
		db.insertOne 
		renderResult - redirect to playlist
		else 404
	}

*/