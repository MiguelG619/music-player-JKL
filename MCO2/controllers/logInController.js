// import User model
const User = require("../models/UserModel.js");

// import jsonwebtoken for authorization
const jwt = require("jsonwebtoken");

// create varaible for key
const jwt_key = "ccapdev";



const loginController = {

    // Checks if user already has an account
  postLogin: function (req, res) {
    User.findOne({
        // Stores username to find
        username: req.body.username
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
            if (result) {
              const token = jwt.sign( {
                  username: user.username
                },
                // Creates a jsonwebtoken so the user can a 24 hours account
                jwt_key, {
                  expiresIn: "24h",
                }
              );
              // returns the username and token
              return res.status(200).json({
                message: "Authentication Successful",
                user: user,
                token: token
              });
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

    deleteUser: function (req, res) {
        // User to be removed
    User.remove({ username: req.params.username })
        // remove user
      .exec().then(function (result) {
        res.status(200).json({
          message: "The user was deleted"
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};



module.exports = userLoginController;