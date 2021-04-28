// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

// const playlistEditController = {
/*
	editPlaylist : function (req, res) {
		getUserQuery - user edited input
		db.updateOne/Many
		render - redirect to playlist + w/ details
		else 404
	}
*/