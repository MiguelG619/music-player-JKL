// import User model
const User = require("../models/UserModel.js");


const loginController = {

    // Checks if user already has an account
    // Stores username to find
  postLogin: function (req, res) {
    User.findOne({username: req.body.username})
      .exec().then(function (user) {
        if (user) { 
            // Checks if password matches the user's original password
          User.findOne({password: req.body.password}, function (err, result) {
            if (err) {
              return res.status(401).json({
                message: "Wrong password entered."
              });
            }
            if (result) {
              // returns the username and token
              return res.status(200).json({
                message: "Authentication Successful",
                user: user
              });
              res.redirect('/searchTracks?username=' + username);
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

       
  }

   

};

module.exports = loginController;