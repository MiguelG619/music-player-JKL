const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    artist: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;
