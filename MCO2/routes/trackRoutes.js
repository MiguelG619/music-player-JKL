const express = require("express");
const musicPlayerController = require("../controllers/musicPlayerController");
const uploadTrackController = require("../controllers/uploadTrackController");
const editTrackController = require("../controllers/editTrackController");

const router = express.Router();

router.get("/musicPlayer/:id", musicPlayerController.getTrack);
router.get("/upload", uploadTrackController.getUpload);
router.post("/upload", uploadTrackController.postTrack);
// <a href="editTrack/{{this._id}}</a> gawing anchr tag yung title ng track
router.get("/editTrack/:id", editTrackController.getEditTrack);
router.patch("/editTrack/:id", editTrackController.updateTrack);
// <a href="/editTrack/delete/{{this._id}}" onclick="return confirm("Are you sure to delete this track?");><i logo></i></a>
 // gawing anchr tag yung delete button
router.get("/editTrack/delete/:id", editTrackController.deleteTrack);

module.exports = router;
