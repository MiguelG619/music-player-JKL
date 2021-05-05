const express = require("express");
const searchTracksController = require("../controllers/searchTracksController");
const searchArtistsController = require("../controllers/searchArtistsController");
const router = express.Router();

router.get("/searchTracks", searchTracksController.getAllTracks);
router.get("/searchOneTrack", searchTracksController.getOneTrack);
router.get("/searchArtists", searchArtistsController.getAllArtists);
router.get("/searchArtists/search", searchArtistsController.getOneArtist);

module.exports = router;
