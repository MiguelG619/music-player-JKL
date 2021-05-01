// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require("../models/UserModel.js");

// import Playlist module
const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const editTracksController = {
  updateTrack: function (req, res) {
    Track.findOneAndUpdate(
      { title: req.body.title },
      {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
      },
      { new: true }
    )
      .then((result) => {
        console.log(result);
        res.redirect("searchTracks");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  deleteTrack: function (req, res) {
    const id = req.params.id;

    Track.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "profilePlaylist" });
      })
      .catch((err) => {
        res.status(500).json({
          message: "error",
        });
      });
  },
};

module.exports = editTracksController;
/*
	updateTrack : function (req, res) {
		getTrackDetails - query of the request
		(db.updateOne) 
		renderResult - redirect to search tracks
		else 404
	}
*/
