// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");

const uploadTrackController = {

  getUpload: function (req, res) {
    res.render('trackUploadEdit');
  },

  postTrack: function (req, res) {
    const username = req.session.user.username;
    // Checks to see if the track is already uploaded
    Track.findOne({ title: req.body.Title })
      .exec()
      .then(function (track) {
        if (track) {
          res.status(409).json({
            message: "Track already exists",
          });
        } else {
          // creates a track object
          const track = new Track({
            title: req.body.Title,
            artist: username,
            image: "s",
            description: req.body.Description,
            url: req.body.Url,
            // image: req.body.image,
            duration: 5,
          });
          // saves the track object to the database
          track.save().then((result) => {
            res.redirect('searchTracks');
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
