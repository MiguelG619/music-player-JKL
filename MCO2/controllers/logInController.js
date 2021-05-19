const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const Track = require("../models/TrackModel.js");
const { validationResult } = require("express-validator");

const loginController = {
  getLogIn: function (req, res) {
    res.render("index");
    // }
  },

  // Checks if user already has an account
  postLogIn: function (req, res) {
    const username = req.body.Username;
    const password = req.body.Password;

      User.findOne({ username: username })
        .exec()
        .then((user) => {
          if (user) {
            bcrypt.compare(password, user.password, (err, equal) => {
              if (!equal)
                res.render('index', {message: "Wrong password entered"});
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
            res.render('index', {message: "Username is incorrect."});
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
    /*
            logs-out the current user
            destroys the current values stored in `req.session`
        */
    req.session.destroy((err) => {
      if (err) throw err;

      /*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
            */
      res.render("index");
    });
  },
};

module.exports = loginController;
