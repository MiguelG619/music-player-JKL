// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');


const signupController = {
    // creates a user account
  postSignUp: function (req, res) {

// Checks if the username exists 
// Else create a new user model
 // Find this user input
    User.findOne({username: req.body.username})
      .exec().then(function (user) {
        // If user exists
        if (user) {
          res.status(409).json({
            message: "Username already exists. Please enter a new one"
          });
        } 
        // Encrypt the user password
        // Create a user model
        else {
          var user = new User({
            username: req.body.username,
            password: req.body.password
          });
          // Creates the playlist for the user
          user.save().then(function (result) {
            // Initializes a blank array for the tracks
            var tracksArray = [];
            var playlist = new Playlist({
              username: req.body.username,
              playlistName: "playlist",
              tracks: tracksArray,
            });
            // saves the playlist
            playlist.save().then(function (result) {
                res.status(201).json({
                  message: "User and user's playlist has been created.",
                });
                 res.render('login');
              })
              .catch(function (err) { 
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
              });
          })
          .catch(function (err) {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });


  }
};

module.exports = userSignupController;