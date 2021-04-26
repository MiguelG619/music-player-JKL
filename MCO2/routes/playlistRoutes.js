
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const playlistRoutes = require('../controllers/playlistRoutes');

const app = express();

app.post('/add', playlistRoutes.addTrackPlaylist);

app.get('/:username', playlistRoutes.getPlaylist);

app.patch('/edit', playlistRoutes.updatePlaylistName);

app.patch('/delete', playlistRoutes.removeTrackPlaylist);

module.exports = app;
