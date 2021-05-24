const User = require("../models/UserModel.js");

const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const editTracksController = {
  getEditTrack: function (req, res) {
    Track.findById(req.params.id)
    .then(result => {
      // console.log(result);
      res.render("trackEdit", {track: result});
    })
    .catch(err => {
      console.log(err);
    })
    
  },

  updateTrack: function (req, res) {
    const description = req.body.Description;
    const title = req.body.Title;
    const url = req.body.URL;
    const id = req.body.id;

        Track.findByIdAndUpdate(id, {title: title, description: description, url: url}, {new: true}, (err, result) => {
          if (err)
            console.log(err);
          else {
            // console.log("SDASDSD");
            res.redirect('/profInfo');
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
            res.redirect("/profInfo");
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
