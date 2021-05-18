const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");

const uploadTrackController = {
  getUpload: function (req, res) {
    res.render("trackUploadEdit");
  },

  postTrack: function (req, res) {
    const username = req.session.user.username;
    // Checks to see if the track is already uploaded
    Track.findOne({ title: req.body.Title })
      .exec()
      .then((track) => {
        if (track) {
          res.status(409).json({
            message: "Track already exists",
          });
        } else {
          const track = new Track({
            title: req.body.Title,
            artist: username,
            image: "a",
            description: req.body.Description,
            url: req.body.URL,
            duration: "5",
          });
          track
            .save()
            .then((result) => {
              res.redirect("/searchTracks");
            })
            .catch((err) => {
              res.status(500).json({
                message: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  },
};

module.exports = uploadTrackController;
