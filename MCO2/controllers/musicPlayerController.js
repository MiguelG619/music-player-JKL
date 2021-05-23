const User = require("../models/UserModel.js");

const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const musicPlayerController = {
  getTrack: function (req, res) {
    const id = req.params.id;
    console.log(id);
    Track.findById(id)
    .then(result => {
      console.log("accessed");
      res.render('musicPlayer', {track: result});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error"
      });
    });
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
