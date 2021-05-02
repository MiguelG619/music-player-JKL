// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require("../models/UserModel.js");

// import Playlist module
const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const editTracksController = {
  updateTrack: function (req, res) {
    const id = req.params.id;
    Track.findOneAndUpdate(
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
