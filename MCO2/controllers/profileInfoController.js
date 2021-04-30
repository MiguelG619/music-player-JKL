
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const Track = require('../models/TrackModel.js');
const Playlist = require('../models/PlaylistModel.js');

const profileInfoController = {

	getPersonalInfo : function (req, res) {
    // Not sure
    User.findOne({user: req.jwt.user}, (err, result) => {
      res.render('/searchTracks?username' + username, {tracks: result});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error"
      });
    }); 
  },

  getOtherProfile : function (req, res) {
    // Not sure
    User.findOne({}, (err, result) => {
      res.render('/searchTracks?username' + username, {tracks: result});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error"
      });
    }); 
  },

		deleteUser: function (req, res) {
        // User to be removed
    User.remove({ username: req.params.username })
        // remove user
      .exec().then(function (result) {
        res.status(200).json({
          message: "The user was deleted"
        });
      })
      .catch(function (err) {
        res.status(500).json({
          error: err,
        });
      });
  }
	
	};



module.exports = profileInfoController;
