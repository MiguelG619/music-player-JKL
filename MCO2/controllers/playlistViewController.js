
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const playlistViewController = {

	getPlaylist : function (req, res) {
		// where to get user?
		db.findOne(User, {username: req.body.username}, 'username', function (flag) {
			if (flag) {
				db.findMany(Playlist, {username: req.body.username}, '', function (flag) {
					if (flag) {
						flag = playlist;
						res.render('profile-playlist', playlist);
					}
			});
			}
		});
		
	}
};
/*
	getPlaylist : function (req, res) {
		db.findMany - find User's playlists
		loadPlaylist - playlist of user
		(db.findMany/One) 
		render - redirect to tracks but with searched artists only
		else 404
	}
*/

module.exports = playlistViewController;