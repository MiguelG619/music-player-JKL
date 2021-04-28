
// import module `mongoose`
const mongoose = require('mongoose');

// import module `User` from `../models/UserModel.js`
const User = require('./UserModel.js');

// ccapdev-mongoose is the name of the database
const url = 'mongodb://localhost:27017/jklDB';

// additional connection options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};



/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;
