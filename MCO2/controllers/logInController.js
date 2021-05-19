const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const Track = require("../models/TrackModel.js");
const { validationResult } = require("express-validator");

const loginController = {
  getLogIn: function (req, res) {
    res.render("index");
    // }
  },

  postLogIn: function (req, res) {
    const username = req.body.Username;
    const password = req.body.Password;

    User.findOne({ username: username })
      .exec()
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, equal) => {
            if (!equal)
              res.render("index", { message: "Wrong password entered" });
            else if (equal) {
              req.session.user = user;
              Track.find()
                .then((result) => {
                  console.log(result);
                  res.render("searchTracks", { track: result });
                })
                .catch((err) => {
                  res.status(404).json({
                    message: "Error",
                  });
                });
            }
          });
        } else {
          res.render("index", { message: "Username is incorrect." });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({
          message: "Authentication failed!",
        });
      });
  },

  getLogOut: function (req, res) {
    req.session.destroy((err) => {
      if (err) throw err;

      res.render("index");
    });
  },
};

module.exports = loginController;
