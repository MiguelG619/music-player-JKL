// import module `mongoose`
const mongoose = require('mongoose');

const PlaylistSchema = require('./PlaylistSchema.js');

// defines the schema for collection `users`
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username field is required']
    },
    password: {
        type: String,
        required: [true, 'Username field is required']
    },
      picture: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    // ARRAY
    tracks: [{ 
        type: Object

    }],
    // String para hanapin lang yung playlistname
    playlistName: [{
        type: String
    }]

}, {timestamps: true});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);