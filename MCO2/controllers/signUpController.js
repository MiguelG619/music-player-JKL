
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import Playlist module
const Playlist = require('../models/PlaylistModel.js');


// const signupController = {
//     // creates a user account
//   // postSignUp: function (req, res) {


/*
  postSignUp : function (req, res) {
      (!db.findOne) - if no username was found
      saveUserInput
      createPlaylist - new Playlist
      db.insertOne - both user details + playlist
      render - redirect to home
      else 404
    }
*/

// module.exports = signupController;