const User = require("../models/UserModel.js");
const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const profileInfoController = {
  getPersonalInfo: function (req, res) {
    const username = req.session.user.username;
    User.findOne({ username: username })
    .then(result => {
      res.render('profInfo', {profile: result});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error",
      });
    });
    // User.findOne({ username: username }, (err, result) => {
    //   res.render("profInfo", { profile: result });
    // }).catch((err) => {
    //   res.status(404).json({
    //     message: "Error",
    //   });
    // });
  },

  getOtherProfile: function (req, res) {
    const username = req.params.username;
    User.findOne({username: username}, (err, result) => {
      console.log(result);
      // res.render('trackUploadEdit');
      res.render('profInfo', {profile: result});
    })
    .catch(err => {
      res.send(err);
    });

  },
};

module.exports = profileInfoController;
