const User = require("../models/UserModel.js");

const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const editTracksController = {
  getEditTrack: function (req, res) {
    res.render("trackUploadEdit");
  },

  updateTrack: function (req, res) {
    const id = req.params.id;

    Track.findOne({ title: req.body.title })
      .exec()
      .then((track) => {
        if (track) {
          res.status(409).json({
            message: "Track already exists. Please enter a new one",
          });
        } else {
          Track.findByIdAndUpdate(
            { id },
            {
              title: req.body.title,
              description: req.body.description,
              url: req.body.url,
            },
            { new: true }
          )
            .then((result) => {
              console.log(result);
              res.redirect("/searchTracks");
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  deleteTrack: function (req, res) {
    const id = req.params.id;
    Track.findByIDAndDelete(id)
      .then((result) => {
        Playlist.updateMany(
          {},
          { $pull: { songs: { url: req.body.url } } },
          { new: true }
        )
          .then((playlist) => {
            res.redirect("/searchTracks");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};

module.exports = editTracksController;
