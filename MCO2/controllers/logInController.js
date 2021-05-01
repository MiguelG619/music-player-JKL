const User = require("../models/UserModel.js");
// import jsonwebtoken for authorization
const jwt = require("jsonwebtoken");
// create varaible for key
const jwt_key = "ccapdev";

const loginController = {

  // getLogIn : function (req,res) {
  // // checks if a user is logged-in by checking the session data
  //   if(req.session.idNum) 
  //     res.redirect('/searchTracks/' + req.session.username);
  //   else
  //     res.render('login');
  //   else {

  //     var details = {
  //         flag: false
  //     };

  //     res.render('login', details);
  //   }
  // },

    // Checks if user already has an account
  postLogin: function(req, res) {
    User.findOne({
        // Stores username to find
        username: req.body.username
        pw: reg.body.password
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
              const token = jwt.sign( { username: user.username},
                jwt_key, { expiresIn: "1h"}
              );
              res.cookie('jwt', token, { httpOnly: true, maxAge: 1800});
              res.status(200).json({
                message: "Authentication success!",
                token: token,
                user: user
              });
              req.session.idNum = user._id;
              req.session.name = user.username;
              res.redirect('/searchTracks/' + user.username);
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

      postLogIn: function (req, res) {

        var idNum = req.body.username;
        var pw = req.body.pw;

        db.findOne(User, {idNum: idNum}, '', function (result) {
            if(result) {

                var user = {
                    fName: result.fName,
                    lName: result.lName,
                    idNum: result.idNum
                };

                bcrypt.compare(pw, result.pw, function(err, equal) {
                    if(equal) {
                        req.session.idNum = user.idNum;
                        req.session.name = user.fName;
                        res.redirect('/profile/' + user.idNum);
                    }
                    else {
                        var details = {
                            flag: false,
                            error: `ID Number and/or Password is incorrect.`
                        };
                        res.render('login', details);
                    }
                });
            }

            else {


                var details = {
                    flag: false,
                    error: `ID Number and/or Password is incorrect.`
                };

                res.render('login', details);
            }
        });
    }
  },

  getLogout : function (req, res) {
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