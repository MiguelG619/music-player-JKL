const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const playlistEditController = {

  getPlaylistEdit: function (req, res) {
    res.render('profPlaylistEdit');
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
