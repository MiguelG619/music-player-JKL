const express = require('express');
const searchTracksController = require('../controllers/searchTracksController');
const searchArtistsController = require('../controllers/searchArtistsController');
const router = express.Router();



router.get('/searchTracks', searchTracksController.getAllTracks);
router.get('/searchTracks/search', searchTracksController.getOneTrack);
router.get('/searchArtists', searchArtistsController.getAllArtist);
router.get('/searchArtists/search', searchArtistsController.getArtist);


module.exports = router;