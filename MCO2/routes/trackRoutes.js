const express = require("express");
const musicPlayerController = require("../controllers/musicPlayerController");
const uploadTrackController = require("../controllers/uploadTrackController");
const editTrackController = require("../controllers/editTrackController");

const router = express.Router();

router.get("/musicPlayer:/:id", musicPlayerController.getTrack);
router.get("/upload", uploadTrackController.getUpload);
router.post("/upload", uploadTrackController.postTrack);
router.put("/editTrack", editTrackController.updateTrack);
router.delete("/editTrack/delete", editTrackController.deleteTrack);

module.exports = router;
