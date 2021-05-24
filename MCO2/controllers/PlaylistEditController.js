const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const playlistEditController = {
   getPlaylistEdit: function (req, res) {
    Playlist.findById(req.params.id)
    .then(result => {
      console.log(result);
      res.render("playlistEdit", {playlist: result});
    })
    .catch(err => {
      console.log(err);
    });
  },

  getPlaylistAdd: function (req, res) {
    res.render("playlistAdd");
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

  updatePlaylist: function (req, res) {
    const oldName = req.body.oldPlaylistName;
    console.log("oldName");
    Playlist.findOneAndUpdate({playlistName: oldName}, {playlistName: req.body.playlistName}, {new: true}, (err, result) => {
          if (err)
            console.log(err);
          else {
            res.redirect('/profInfo');
          }
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
