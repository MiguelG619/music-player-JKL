// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

// const profileEditController = {
/*
	editPlaylist : function (req, res) {
		getUserQuery - user edited input
		(db.updateOne)- 
		render - redirect to profile info 
		else 404
	}
*/