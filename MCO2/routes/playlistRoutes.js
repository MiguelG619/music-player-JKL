const express = require('express');
const playlistViewController = require('../controllers/playlistViewController');
const playlistEditController = require('../controllers/playlistEditController');
const router = express.Router();

router.get("/playlistView", playlistViewController.getAllPlaylists);
router.post("/playlistView/create", playlistViewController.postPlaylist);
router.put("/playlistView/edit", playlistEditController.updatePlaylist);
router.put("/playlistView/delete/:id", playlistEditController.deletePlaylist);

module.exports = router;
