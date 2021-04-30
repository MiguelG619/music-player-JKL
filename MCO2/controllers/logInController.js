const User = require("../models/UserModel.js");
// import jsonwebtoken for authorization
const jwt = require("jsonwebtoken");
// create varaible for key
const jwt_key = "ccapdev";

const loginController = {

   getLogIn : function (req,res) {
    res.render('login');
  },

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
              const token = jwt.sign( { username: user.username},
                jwt_key, { expiresIn: "1h"}
              );
              // returns the username and token
              // return res.status(200).json({
              //   message: "Authentication Successful",
              //   user: user,
              //   token: token
              // });
              res.cookie('jwt', token, { httpOnly: true, maxAge: 1800});
              res.status(201).json(user);
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