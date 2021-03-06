const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");

const uploadTrackController = {
  getUpload: function (req, res) {
    res.render("trackUploadEdit");
  },

  postTrack: function (req, res) {
    var user = req.session.user;

    Track.findOne({ title: req.body.Title })
      .exec()
      .then((track) => {
        if (track) {
          res.render("trackUploadEdit", { message: "Track already exists." });
        } else {  
          const track = new Track({
            title: req.body.Title,
            artist: user.username,
            image: "a",
            description: req.body.Description,
            url: req.body.URL,
          });

          user.tracks.push(track);
          // console.log(user.tracks);
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
