
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const searchArtistsController = {


	getAllArtist : function (req, res) {
		User.find().sort({ createdAt: -1}).then(result => {
			// tracks must be in hbs (tracks.title, tracks.image, etc.)
			res.render('searchArtist', {artist: result});
		})
		.catch(err => {
			res.status(404).json({
                message: "Error"
              });
		});
	},

	getArtist : function (req, res) {
		User.findOne({title: req.query.search}, (err, result) => {
			res.render('/profileInfo?username' + username, {tracks: result});
		})
		.catch(err => {
			res.status(404).json({
				message: "Error"
			});
		}); 
	}

};

module.exports = searchArtistsController;
/*
	getArtists : function (req, res) {
		getUserQuery
		(db.findOne)
		render - redirect to tracks but with searched artists only
		else 404
	}
*/