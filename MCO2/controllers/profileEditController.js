// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const profileEditController = {

	updateProfile: function (req, res) {
		const profile = new User(req.body);

		profile.save().then(result => {
			res.redirect('profileInfo')
		})
		.catch(err => {
			console.log(err);
		});
	},


	deleteUser: function (req, res) {
    	const id = req.params.id;

    	User.findByIdAndDelete(id)
    	.then(result => {
    		res.json({ redirect: 'login'})
    	})
    	.catch(err => {
      res.status(404).json({
        message: "Error"
      });
    }); 

	}
};

module.exports = loginController;


/*
	editProfile : function (req, res) {
		getUserQuery - user edited input
		(db.updateOne) - 
		render - redirect to profile info + details
		else 404
	}


*/