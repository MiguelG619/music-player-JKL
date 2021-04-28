const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        require: true
    },
    
});

const Track = mongoose.model("Track", SongSchema);
module.exports = Track;