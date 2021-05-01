// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require("../models/UserModel.js");
const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const profileInfoController = {
  getPersonalInfo: function (req, res) {
    // Not sure
    User.findOne({ user: req.username.body }, (err, result) => {
      res.render("/searchTracks?username" + username, { tracks: result });
    }).catch((err) => {
      res.status(404).json({
        message: "Error",
      });
    });
  },

  getOtherProfile: function (req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((result) => {
        render("/profileInfo", { artist: result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
        });
      });
  },
};

module.exports = profileInfoController;
