const User = require("../models/UserModel.js");
const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const profileInfoController = {
  getPersonalInfo: function (req, res) {
    const username = req.session.user.username;
    User.findOne({ username: username })
    .then(userresult => {
      // console.log(result);
      Track.find({artist: username})
      .then((result) => {
        res.render('profInfo', {profile: userresult, tracks: result});
      })
      .catch((err) => {
        res.status(404).json({
          message: "Error",
        });
      });
    })
    .catch(err => {
      res.status(404).json({
        message: "Error",
      });
    });
    
  },

  getOtherProfile: function (req, res) {
    const username = req.params.username;
    User.findOne({username: username})
    .then(userresult => {
      Track.find({artist: username})
      .then((result) => {
        res.render('otherProfile', {profile: userresult, tracks: result});
      })
      .catch((err) => {
        res.status(404).json({
          message: "Error",
        });
      });
    })
    .catch(err => {
      res.status(404).json({
        message: "Error"
      });
    });
  },
};

module.exports = profileInfoController;
