const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    playlistName: {
        type: String,
        required: true
    },
    // array dapat 
    tracks: {
        type: String[], 
     
    }
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;