
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

const uploadTrackController = {

	postTrack : function (req, res) {
		// Checks to see if the track is already uploaded
    Track.findOne({ title: req.body.title })
      .exec().then(function (track) {
        if (track) {
          res.status(409).json({
            message: "Track is already in the database",
          });
        } else {
          // creates a track object
          const track = new Track({
            title: req.body.title,
            artist: req.body.artist,
            url: req.body.url,
            // image: req.body.image,
            duration: req.body.duration
          });
          // saves the track object to the database
          track.save().then(result => {
			// Logged User
			Track.find({username: req.body.username}).then(resultTracks => {
				res.render('profilePlaylist', {track: resultTracks});
			})
			.catch(err => {
				res.status(500).json({
					message: "error"
				});
			});
		});

        }
      })
      .catch(function (err) {
        res.status(500).json({
          error: err,
        });
      });
  }
};


module.exports = userSignupController;
