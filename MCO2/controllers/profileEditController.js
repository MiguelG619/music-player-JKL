const User = require("../models/UserModel.js");
const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");
const profileEditController = {
  getProfileEdit: function (req, res) {
    res.render("profInfoEdit");
  },

  updateProfile: function (req, res) {
    const username = req.session.user.username;
    User.findOneAndUpdate(
      { username: username },
      { description: req.body.description },
      { new: true }
    )
      .then((result) => {
        res.redirect("/profInfo");
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
        });
      });
  },

  deleteUser: function (req, res) {
    const username = req.session.user.username;
    Track.deleteMany({ artist: username })
      .then((result) => {
        console.log("success");
        Playlist.deleteMany({ username: username })
          .then((result) => {
            console.log(success);
            User.deleteMany({ username: username })
              .then((result) => {
                console.log(success);
                req.session.destroy((err) => {
                  if (err) throw err;
                  res.redirect("/index");
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Error",
                });
              });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error",
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
        });
      });
  },
};

module.exports = profileEditController;
