const User = require("../models/UserModel.js");
const Playlist = require("../models/PlaylistModel.js");
const bcrypt = require("bcrypt");

const signUpController = {


  getSignUp: function (req, res) {
    res.render("register");
  },

  // creates a user account
  postSignUp: function (req, res) {
    let username = req.body.Username;
    let password = req.body.Password;
    // Checks if the username exists
    // Else create a new user model
    User.findOne({
      // Find this user input
      username: username,
    })
      .exec()
      .then(function (user) {
        // If user exists
        if (user) {
          res.status(409).json({
            message: "Username already exists. Please enter a new one",
          });
        }
        // Encrypt the user password
        else {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            }
            // Create a user model
            else {
              const user = new User({
                username: username,
                password: hash,
              });
              // Creates the playlist for the user
              user
                .save()
                .then(function (result) {
                  // Initializes a blank array for the tracks
                  var tracksArray = [];
                  const playlist = new Playlist({
                    username: username,
                    playlistName: "My Tracks",
                    tracks: tracksArray,
                  });
                  // saves the playlist
                  playlist
                    .save()
                    .then(function (result) {
                      res.render('index');
                      // Check if user has signed up
                     
                    })
                    .catch(function (err) {
                      console.log(err);
                      res.status(500).json({
                        error: err,
                      });
                    });
                })
                .catch(function (err) {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};

module.exports = signUpController;
