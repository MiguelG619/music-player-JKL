const express = require('express');
const musicPlayerController = require('../controllers/musicPlayerController');
const uploadTrackController = require('../controllers/editTrackController');
const editTrackController = require('../controllers/editTrackController');

const router = express.Router();

router.get('/musicPlayer:/:id', signUpController.getTrack);
router.post('/upload/create', uploadTrackController.getTrack);
router.put('/editTrack', editTrackController.updateTrack);
router.delete('/editTrack/delete', editTrackController.deleteTrack);

module.exports = router;