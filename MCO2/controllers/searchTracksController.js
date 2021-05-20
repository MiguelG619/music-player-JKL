const User = require("../models/UserModel.js");

const Track = require("../models/TrackModel.js");

const searchTracksController = {
  getAllTracks: function (req, res) {
    Track.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("searchTracks", { track: result });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Error",
        });
      });
  },

  getOneTrack: function (req, res) {
    console.log(req.query.search);
    Track.findOne(
      { title: { $regex: req.query.search, $options: "i" } },
      (err, result) => {
        if (result) {
          res.render("searchTracks", { track: result });
        } else {
          res.status(404).json({
            message: "Track not found",
          });
        }
      }
    ).catch((err) => {
      res.status(404).json({
        message: "Error",
      });
    });
  },
};

module.exports = searchTracksController;
