const User = require("../models/UserModel.js");

const loginController = {

  getLogIn: function (req, res) {
        // checks if a user is logged-in by checking the session data
        if(req.session.idNum) 
            res.redirect('/searchTracks/' + req.session.idNum);
        // else if a user is not yet logged-in
        else {
            res.render('login');
        }
    },

    // Checks if user already has an account
  postLogIn: function(req, res) {
    User.findOne({
        username: req.body.username,
        password: reg.body.password
    })
      .exec().then(function (user) {
        if (user) { 
            // Checks if password matches the user's original password
          bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) {
              return res.status(401).json({
                message: "Wrong password entered."
              });
            }
            else if (result) {
              console.log(req.session);
              req.session.user = user;
              res.redirect('/searchTracks/' + user);
            } 
            else {
                // if user is already
              return res.status(401).json({
                message: "Authentication failure",
              });
            }
          });
        } 
        else {
          return res.status(401).json({
            message: "Authentication failure",
          });
        }
      })
      .catch(function (err) {
        res.status(500).json({
          error: err,
        });
      });
  },

  getLogOut : function (req, res) {
    /*
            logs-out the current user
            destroys the current values stored in `req.session`
        */
        req.session.destroy(function(err) {
            if(err) throw err;

            /*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
            */
            res.redirect('/login');
        });

  }


};

module.exports = loginController;