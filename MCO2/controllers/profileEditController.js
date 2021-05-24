const User = require("../models/UserModel.js");
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
    const username = req.session.user.username;
    
    User.findOneAndDelete({username: username})
    .then(user => {
      Track.deleteMany({artist: username})
      .then(track => {
        Playlist.deleteMany({username: username})
        .then(playlist =>{
          res.render('index');
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
    }
};

module.exports = profileEditController;
