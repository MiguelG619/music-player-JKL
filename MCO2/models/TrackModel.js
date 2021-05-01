const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
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
