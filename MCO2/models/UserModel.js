
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // NOT SURE
    tracks: {
        type: String,
        required: true
    },
    playlists: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    }

});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);
