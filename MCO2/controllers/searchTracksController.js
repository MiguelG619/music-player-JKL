
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

const searchTracksController = {

	getAllTracks : function (req, res) {
		Track.find().sort({ createdAt: -1}).then(result => {
			// tracks must be in hbs (tracks.title, tracks.image, etc.)
			res.render('searchTracks', {track: result});
		})
		.catch(err => {
			res.status(404).json({
                message: "Error"
              });
		});
	},

	getOneTrack : function (req, res) {
		Track.findOne({title : req.query.search}, (err, result) => {
			res.render('searchTracks', {track: result});
		})
		.catch(err => {
			res.status(404).json({
                message: "Error"
              });
		}); 

	}
	
};

module.exports = searchTracksController;
