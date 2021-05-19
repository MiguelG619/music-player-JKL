const User = require("../models/UserModel.js");
const { validationResult } = require("express-validator");
const Playlist = require("../models/PlaylistModel.js");
const bcrypt = require("bcrypt");

const signUpController = {
  getSignUp: function (req, res) {
    res.render("register");
  },

  postSignUp: function (req, res) {
    const username = req.body.Username;
    const realName = req.body.Realname;
    const password = req.body.Password;

    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors = errors.errors;

      var details = {};
      for (i = 0; i < errors.length; i++)
        details[errors[i].param + "Error"] = errors[i].msg;

      res.render("register", details);
    } else {
      User.findOne({
        username: username,
      })
        .exec()
        .then(function (user) {
          if (user) {
            res.render("register", { message: "Username already exists." });
          } else {
            bcrypt.hash(password, 10, function (err, hash) {
              if (err) {
                return res.status(500).json({
                  error: err,
                });
              } else {
                var user = new User({
                  username: username,
                  realName: realName,
                  password: hash,
                });

                user
                  .save()
                  .then(function (result) {
                    var tracksArray = [];
                    const playlist = new Playlist({
                      username: username,
                      playlistName: username + " Tracks",
                      tracks: tracksArray,
                    });

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
    const username = req.query.username;
    User.findOne({ username: username }, (err, result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
    });
  },
};

module.exports = signUpController;
