const express = require("express");
const playlistViewController = require("../controllers/playlistViewController");
const playlistEditController = require("../controllers/playlistEditController");
const router = express.Router();

router.get("/playlistView", playlistViewController.getAllPlaylists);
router.post("/playlistView/create", playlistViewController.postPlaylist);
router.get("/playlistView/edit", playlistEditController.getPlaylistEdit);
router.patch("/playlistView/edit", playlistEditController.updatePlaylist);

// <a href="/playlistView/delete/{{this._id}}" onclick="return confirm("Are you sure to delete this track?");><i logo></i></a>
 // gawing anchr tag yung delete button
router.get("/playlistView/delete/:id", playlistEditController.deletePlaylist);

module.exports = router;
