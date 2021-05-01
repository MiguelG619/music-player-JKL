// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const playlistEditController = {

	

	// where to get username?
	updatePlaylist: function (req, res) {
		// access user first
     	Playlist.findOneAndUpdate(
      		{username: user},
      		{description: req.body.description}, 
      		{new:true})
	      	.then(result => {
	      		res.render('playlistView');
	      	})
	      	.catch(err => {
	      		res.status(500).json({
	      			message: "Error"
	      		});
	      	});

		},

		deletePlaylist: function (req, res) {
			const id = req.params.id;

			Playlist.findByIdAndDelete(id)
			.then(result => {
				res.json({ redirect: 'profilePlaylist'})
			})
			.catch(err => {
				res.status(500).json({
					message: "error"
				});
			});	
		}

};

module.exports = profileInfoController;