const Playlist = require("../models/PlaylistModel");

const playlistController = {

  // loads playlist
  getPlaylist: function (req, res) {
    // Checks the user's playlist
    Playlist.findOne({ username: req.params.username })
      .exec()
      .then(function (result)  {
        if (result)
          res.status(200).json({
            message: "Search playlist",
            result: result,
          });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  // Add tracks to the user's playlist
  addTrackToPlaylist: function (req, res) {
    // Find the user's playlist and adds the track
    Playlist.findOneAndUpdate(
      { username: req.body.username },
      {
        $push: {
          tracks: {
            title: req.body.title,
            artist: req.body.artist,
            url: req.body.url,
            image: req.body.image,
            duration: req.body.duration
          },
        },
      })
      .exec().then(function (result) {
        if (result) {
          res.status(200).json({
            message: "Playlist updated",
          });
        }
      })
      .catch(function (err) {
        res.status(500).json({
          error: err,
        });
      });
  },

  // Changes the playlist name
  updatePlaylistName: function (req, res) {
    // Find the playlist of the user
    Playlist.findOne({ username: req.body.username })
      .exec().then(function (result) {
        if (result) {
          Playlist.updateOne(
            { username: req.body.username },
            { $set: { playlistName: req.body.playlistName } }
          )
            .then(
              res.status(200).json({
                message: "Playlist updated",
              })
            )
            .catch(function (err) {
              console.log(err);
              res.status(500).json({
                error: err,
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

  // Deletes a track from the user's playlist
  removeFromPlaylist: function (req, res) {
    // Finds the user's playlist
    Playlist.findOne({ username: req.body.username })
      .exec().then(function (result) {
        if (result) {
          Playlist.updateOne(
            // Checks the user's playlist and pulls/remove the user's track in the playlist 
            { username: req.body.username },
            { $pull: { tracks: { url: req.body.track.url } } }
          )
            .then(
              res.status(200).json({
                message: "Playlist updated",
              })
            )
            .catch(function (err) {
              res.status(500).json({
                error: err,
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

module.exports = playlistController;