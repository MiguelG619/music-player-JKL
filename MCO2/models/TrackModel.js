const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Track = mongoose.model("Track", SongSchema);
module.exports = Track;