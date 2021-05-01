// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');

const profileEditController = {

	updateProfile: function (req, res) {
		// access iser first
     	User.findOneAndUpdate(
      		{username: user},
      		{description: req.body.description}, 
      		{new:true})
	      	.then(result => {
	      		res.render('profileInfo');
	      	})
	      	.catch(err => {
	      		res.status(500).json({
	      			message: "Error"
	      		});
	      	});
		},

		deleteUser: function (req, res) {
        // HOW TO ACESS LOGGED IN USER
      Track.deleteMany({artist: req.body.username}).then(result => {
        console.log("success");
        Playlist.deleteMany({user: req.body.username}).then(result => {
            console.log(success);
            User.deleteMany({user: req.body.username}).then(result => {
              console.log(success);
              res.json({ redirect: 'login'})
            })
            .catch(err => {
              res.status(500).json({
                message: "Error"
              });
      }); 
        })
        .catch(err => {
          res.status(500).json({
            message: "Error"
          });
        }); 
        })
        .catch(err => {
          res.status(500).json({
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