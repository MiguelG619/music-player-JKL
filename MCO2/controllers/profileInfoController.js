
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const Track = require('../models/TrackModel.js');
const Playlist = require('../models/PlaylistModel.js');

const profileInfoController = {

	getInfo : function (req, res) {
		// where to get info of user?
		db.findOne(User, {username: req.body.username}, '', function (flag) {
			flag = info;
			res.render('profile-Info', info);
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
