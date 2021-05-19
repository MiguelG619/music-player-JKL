
// import module `check` from `express-validator`
const { check } = require('express-validator');

/*
    defines an object which contains functions
    which returns array of validation middlewares
*/
const validation = {

    /*
        function which returns an array of validation middlewares
        called when the client sends an HTTP POST request for `/signup`
    */
    signUpValidation: function () {

        /*
            object `validation` is an array of validation middlewares.
            the first parameter in method check() is the field to check
            the second parameter in method check() is the error message
            to be displayed when the value to the parameter fails
            the validation
        */
        var validation = [

            // checks if `fName` is not empty
            check('username', 'Username should not be empty.').notEmpty(),

            check('username', 'Username should contain at least 3 characters.')
            .isLength({ max: 10}),

            // checks if lName is not empty
            check('realName', 'Real name should not be empty.').notEmpty(),

            // checks if `pw` contains at least 8 characters
            check('password', 'Passwords should contain at least 5 characters.')
            .isLength({min: 5})
        ];

        return validation;
    }

    
};

/*
    exports the object `validation` (defined above)
    when another script exports from this file
*/
module.exports = validation;
