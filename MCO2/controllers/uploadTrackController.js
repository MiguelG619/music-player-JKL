// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");

const uploadTrackController = {

  postTrack: function (req, res) {
    const username = req.session.user.username;
    // Checks to see if the track is already uploaded
    Track.findOne({ title: req.body.title })
      .exec()
      .then(function (track) {
        if (track) {
          res.status(409).json({
            message: "Track already exists",
          });
        } else {
          // creates a track object
          const track = new Track({
            title: req.body.title,
            artist: req.body.artist,
            url: req.body.url,
            // image: req.body.image,
            duration: req.body.duration,
          });
          // saves the track object to the database
          track.save().then((result) => {
            res.redirect("searchTracks");
          })
          .catch(err => {
            res.statust(500).json({
              error: err
            });
          });
        }
      })
      .catch(function (err) {
        res.status(500).json({
          error: err,
        });
      });
  },
};

module.exports = uploadTrackController;
