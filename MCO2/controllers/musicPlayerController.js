// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require("../models/UserModel.js");

// import Playlist module
const Playlist = require("../models/PlaylistModel.js");

const Track = require("../models/TrackModel.js");

const musicPlayerController = {
  getTrack: function (req, res) {
    const id = req.params.id;
    Track.findById(id)
      .then((result) => {
        render("musicPlayer", { track: result });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = searchTracksController;
