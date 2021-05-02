// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");

// import Playlist module
const Playlist = require("../models/PlaylistModel.js");

const playlistEditController = {

  updatePlaylist: function (req, res) {
    Playlist.findOneAndUpdate(
      { username: req.session.user.username},
      { playlistName: req.body.playlistName,
        description: req.body.description 
      },
      { new: true }
    )
      .then((result) => {
        res.redirect("/playlistView");
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
        });
      });
  },

  deletePlaylist: function (req, res) {
    const id = req.params.id;

    Playlist.findByIdAndDelete(id)
      .then((result) => {
        res.redirect("/playlistView");
      })
      .catch((err) => {
        res.status(500).json({
          message: "error",
        });
      });
  },
};

module.exports = playlistEditController;
