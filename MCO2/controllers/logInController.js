const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const Track = require("../models/TrackModel.js");

const loginController = {
  getLogIn: function (req, res) {
    // checks if a user is logged-in by checking the session data
    // if(req.session.idNum)
    //     res.redirect('/searchTracks/' + req.session.idNum);
    // // else if a user is not yet logged-in
    // else {
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
            if (err)
              return res.status(401).json({
                message: "Wrong password entered.",
              });
            else if (equal) {
              req.session.user = user;
              Track.find()
                .then((result) => {
                  console.log(result);
                  // tracks must be in hbs (tracks.title, tracks.image, etc.)
                  console.log(req.session.user);
                  res.render("searchTracks", { track: result });
                  
                })
                .catch((err) => {
                  res.status(404).json({
                    message: "Error",
                  });
                });
              // res.render("searchTracks", { user: req.session.user });
            }
          });
        } else {
          res.status(401).json({
            message: err,
          });
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
      res.redirect("/login");
    });
  },
};

module.exports = loginController;
