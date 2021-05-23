const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const playlistEditController = {
  getPlaylistEdit: function (req, res) {
    res.render("playlistAddEdit", {isAdd: false});
  },

  getPlaylistAdd: function (req, res) {
    res.render("playlistAddEdit", {isAdd: true});
  },

  postPlaylist: function (req, res) {
    const newTracksArray = [];
    const playlistName = req.body.playlistName;
    User.findOne({ playlistName: playlistName })
      .exec()
      .then((playlist) => {
        if (playlist) {
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
              res.redirect("/profInfo");
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

  updatePlaylist: function (req, res) {
    Playlist.findOneAndUpdate(
      { username: req.session.user.username },
      {
        playlistName: req.body.playlistName,
        description: req.body.description,
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

    Playlist.findByIdAndRemove(id)
      .then((result) => {
        res.redirect("/playlistView");
      })
      .catch((err) => {
        res.status(500).json({
          message: "error",
        });
      });
  },

  removeTrackfromPlaylist: function (req, res) {
    const username = req.session.user.username;
    Playlist.findOne({ username: username })
      .exec()
      .then((result) => {
        if (result) {
          Playlist.updateOne(
            { username: username },
            { $pull: { tracks: { url: req.body.track.url } } }
          )
            .then(
              res.status(200).json({
                message: "Track removed from playlist",
              })
            )
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
};

module.exports = playlistEditController;
