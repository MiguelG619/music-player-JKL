// delete?
// Import Track model
const Track = require("../models/TrackModel");

// Importa Playlist model
const Playlist = require("../models/PlaylistModel");

const trackController = {

  getTracks: function (req, res) {
    // Find the track inputted i the search bar
    Track.find({ 
      // title: { $regex: req.params.query, $options: "i" }
    })
    // Loads the searched tracks
      .exec().then(function (track) {
        res.status(200).json({
          message: "Searched tracks",
          track: track,
        });
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  getAllTracks: function (req, res) {
    // Finds all the tracks
    Track.find({})
      .exec().then(function (results) {
        if (results) {
          // loads all the tracks
          res.status(200).json({
            results: results,
          });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  // Track upload by the user
  postUpload: function (req, res) {
    // Checks to see if the track is already uploaded
    Track.findOne({ title: req.body.title })
      .exec().then(function (track) {
        if (track) {
          res.status(409).json({
            message: "Track is already in the database",
          });
        } else {
          // creates a track object
          const track = new Track({
            title: req.body.title,
            artist: req.body.artist,
            url: req.body.url,
            image: req.body.image,
            duration: req.body.duration
          });
          // saves the track object to the database
          track.save().then(function () {
              res.status(201).json({
                message: "Track added",
              });
            })
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

  deleteTrack: function (req, res) {
    Track
  },

};

module.exports = songDBController;