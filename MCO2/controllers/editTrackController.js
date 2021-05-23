const User = require("../models/UserModel.js");

const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const editTracksController = {
  getEditTrack: function (req, res) {
    Track.findById(req.params.id)
    .then(result => {
      res.render("trackEdit", {track: result});
    })
    .catch(err => {
      console.log(err);
    })
    
  },

  updateTrack: function (req, res) {
    const description = req.body.Description;
  
        Track.findOneAndUpdate({title: req.body.title}, {title: req.body.Title, description: description, url: req.body.Url}, {new: true}, (err, result) => {
          if (err)
            console.log(err);
          else {
            res.redirect('/searchTracks');
          }
        });
  },

  deleteTrack: function (req, res) {
    const id = req.params.id;
    Track.findByIdAndRemove(id)
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
