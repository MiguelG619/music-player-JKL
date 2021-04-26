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
    tracks: [tracks]
     // [type: Object]
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;