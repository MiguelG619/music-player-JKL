
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const signupController = {


    /*
        executed when the client sends an HTTP POST request `/signup`
        as defined in `../routes/routes.js`
    */
    postSignUp: function (req, res) {

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="username">
            can be retrieved using `req.body.username`
        */
        var username = req.body.username;
        var password = req.body.password;
        
        // Stores it in an object to be passed into the database
        var user = {
            username: username,
            password: password,
        };

        /*
            calls the function insertOne()
            defined in the `database` object in `../models/db.js`
            this function adds a document to collection `users`
        */
        db.insertOne(User, user, function(flag) {
            if(flag) {
                /*
                    upon adding a user to the database,
                    redirects the client to `/success` using HTTP GET,
                    defined in `../routes/routes.js`
                    passing values using URL
                    which calls getSuccess() method
                    defined in `./successController.js`
                */
                res.redirect('/login');
            }
        });
    }
};

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;