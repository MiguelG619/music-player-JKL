const User = require("../models/UserModel.js");

// import Playlist module
const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const musicPlayerController = {
  getTrack: function (req, res) {
    res.render('searchTracks');
  },

  addTrackToPlaylist: function (req, res) {
    const username = req.session.user.username;
    Playlist.findOneAndUpdate(
      { username: username },
      {
        $push: {
          tracks: {
            title: req.body.track.title,
            artist: req.body.track.artist,
            image: req.body.track.image,
            duration: req.body.track.duration,
            description: req.body.track.description,
            url: req.body.track.url,
          },
        },
      }
    )
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Playlist updated",
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

module.exports = musicPlayerController;
