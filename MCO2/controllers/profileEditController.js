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

  deleteUser: function (req, res) {
    const id = req.session.user._id;
    console.log(id);
    User.findByIdAndRemove(id,  (err, doc) => {
        if (!err) {
            res.render('index');
        }
        else { console.log(err); }
    });
  },
};

module.exports = profileEditController;
