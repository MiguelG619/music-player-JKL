const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const Track = require("../models/TrackModel.js");
const Playlist = require("../models/PlaylistModel.js");

const profileEditController = {
  getProfileEdit: function (req, res) {
    res.render("profileInfoEdit", {profile: req.session.user});
  },

  updateProfile: function (req, res) {
    const description = req.body.Description;

    const username = req.session.user.username;
  
        User.findOneAndUpdate({username: username}, {description: description}, {new: true}, (err, result) => {
          if (err)
            console.log(err);
          else {
            res.redirect('/profInfo');
          }
        });
        
    
  },

  // deleteUser: function (req, res) {
  //   var user = req.session.user;
  //   // console.log(id);
  //   User.findByIdAndRemove(user.id, (err, doc) => {
  //       if (!err) {
  //         res.render('index');
  //       }
  //       else { console.log(err); }
  //   });
  // },



  deleteUser: function (req, res) {
    var user = req.session.user;
    // console.log(user._id)
    User.findByIdAndRemove(user._id)
      .then((result) => {
        Track.deleteMany({username:user.username})
          .then((result) => {
            Playlist.updateMany(
              {},
              { $pull: { songs: { url: req.body.url } } },
              { new: true }
            )
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
        res.render("index");
      })
      .catch((err) => {
        res.status(500).json({
          message: "error",
        })
      })
    }
};

module.exports = profileEditController;
