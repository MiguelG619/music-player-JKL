
/*
    defines an object which contains functions executed as callback
    when a client requests for `success` paths in the server
*/
const logInController = {

    /*
        executed when the client sends an HTTP GET request `/success`
        as defined in `../routes/routes.js`
    */
     getLogIn: function (req, res) {

        // render `../views/index.hbs`
        res.render('login');
    },

    postLogIn: function (req, res) {

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="username">
            can be retrieved using `req.body.fName`
        */
        var username = req.body.username;
        var password = req.body.password;
        
        // Stores it in an object to be passed into the database
        var user = {
            username: username,
            password: password,
        };

         /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
        db.findOne(User, query, projection, function(result) {

            /*
                if the user exists in the database
                render the profile page with their details
                PUT TRACKS AND PLAYLSITA ND ICONS AND DEATAILS?
            */
            if(result != null) {
                var details = {
                    username: result.username,
                    icon: result.lNmae,
                    idNum: result.idNum
                };

                // render `../views/profile.hbs`
                res.render('home-tracks', details);
            }
            /*
                if the user does not exist in the database
                render the error page
            */
            else {
                // render `../views/error.hbs`
                res.status('401');
                res.write('Client must authenticate (login or provide valid credentials) to access the resource');
            }
        });
    }

};

/*
    exports the object `successController` (defined above)
    when another script exports from this file
*/
module.exports = successController;
