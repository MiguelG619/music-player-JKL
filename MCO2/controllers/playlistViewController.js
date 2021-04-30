
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const playlistViewController = {

	getAllPlaylists : function (req, res) {
		// Input in find the user logged in
		Playlist.find().sort({ createdAt: -1}).then(result => {
			// tracks must be in hbs (tracks.title, tracks.image, etc.)
			res.render('playlistView', {track: result});
		})
		.catch(err => {
			res.status(404).json({
                message: "Error"
              });
		});
	},

	// get tracks per playlist will be get in searchTracks
		
	postPlaylist : function (req, res) {
		let newTracksArray = [];
		const newPlaylist = new Playlist({
			// logged in user
			username: user,
			playlistName: playlistName,
			tracks: newTracksArray
		});

		newPlaylist.save().then(result => {
			// Logged User
			Playlist.find({username: user}).then(resultPlaylists => {
				res.render('profilePlaylist', {playlist: resultPlaylists});
			})
			.catch(err => {
				res.status(500).json({
					message: "error"
				});
			});
		});
	}


};

module.exports = playlistViewController;