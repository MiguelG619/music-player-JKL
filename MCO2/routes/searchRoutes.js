const express = require('express');
const searchTracksController = require('../controllers/searchTracksController');
const searchArtistsController = require('../controllers/searchArtistsController');
const router = express.Router();



router.get('/searchTracks', signUpController.getAllTracks);
router.get('/searchTracks/search', signUpController.getOneTrack);
router.get('/searchArtists', signUpController.getAllArtist);
router.get('/searchArtists/search', signUpController.getOnertist);


module.exports = router;