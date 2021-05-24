const User = require("../models/UserModel.js");
const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const playlistViewController = {
  getAllPlaylists: function (req, res) {
    Playlist.find({ username: req.session.user.username })
      .sort({ createdAt: -1 })
      .then((result) => {
        // console.log(result);

        res.render("profPlaylist", { playlist: result });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Error",
        });
      });
  },

  getOnePlaylist: function (req, res) {
    Playlist.findOne({ _id: req.params.id })
      .then((result) => {
        // console.log(result);
        // tracks must be in hbs (tracks.title, tracks.image, etc.)
        res.render("profPlaylist", { playlist: result });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Error",
        });
      });
  },

  postPlaylist: function (req, res) {
    const newTracksArray = [];
    const playlistName = req.body.playlistName;
    Playlist.findOne({ playlistName: playlistName })
      .exec()
      .then((track) => {
        if (track) {
          res.status(409).json({
            message: "Playlist already exists",
          });
        } else {
          const newPlaylist = new Playlist({
            username: req.session.user.username,
            playlistName: req.body.playlistName,
            tracks: newTracksArray,
          });
          newPlaylist
            .save()
            .then((result) => {
              res.redirect("/playlistView");
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      });
  },

  getTracksPlaylist: function (req, res) {
    const id = req.params.id;
    Playlist.findById(id)
      .sort({ createdAt: -1 })
      .then((result) => {
        // tracks must be in hbs (tracks.title, tracks.image, etc.)
        // saang page ilalagay yung tracks na nasa playlist?
        // edi dapat may if sa hbr kung playlist o tracks
        res.render("", { track: result });
        // console.log(result);
      })
      .catch((err) => {
        res.status(404).json({
          message: "Error",
        });
      });
  },
};

module.exports = playlistViewController;
