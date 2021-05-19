const User = require("../models/UserModel.js");
const { validationResult } = require("express-validator");
const Playlist = require("../models/PlaylistModel.js");
const bcrypt = require("bcrypt");

const signUpController = {
  getSignUp: function (req, res) {
    res.render("register");
  },

  // creates a user account
  postSignUp: function (req, res) {
    const username = req.body.Username;
    const realName = req.body.Realname;
    const password = req.body.Password;

    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      // get the array of errors
      errors = errors.errors;

      /*
                for each error, store the error inside the object `details`
                the field is equal to the parameter + `Error`
                the value is equal to `msg`
                as defined in the validation middlewares

                for example, if there is an error for parameter `fName`:
                store the value to the field `fNameError`
            */
      var details = {};
      for (i = 0; i < errors.length; i++)
        details[errors[i].param + "Error"] = errors[i].msg;

      /*
                render `../views/signup.hbs`
                display the errors defined in the object `details`
            */
      res.render("register", details);
    } else {
      User.findOne({
        // Find this user input
        username: username,
      })
        .exec()
        .then(function (user) {
          // If user exists
          if (user) {
            res.render("register", { message: "Username already exists." });
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
                var user = new User({
                  username: username,
                  realName: realName,
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
                      playlistName: username + " Tracks",
                      tracks: tracksArray,
                    });
                    // saves the playlist
                    playlist
                      .save()
                      .then(function (result) {
                        res.render("index");
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
    }
  },

  getCheckUsername: function (req, res) {
    // your code here
    const username = req.query.username;
    User.findOne({ username: username }, (err, result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
    });
  },
};

module.exports = signUpController;
