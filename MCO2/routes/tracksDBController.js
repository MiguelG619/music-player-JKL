
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const trackDBController = require('../controllers/trackDBController');

const app = express();

app.post('/upload', trackDBController.postUpload);

app.get('/search/:query', trackDBController.getTracks);

app.post('/delete', trackDBController.deleteTrack);

app.patch('/update', trackDBController.updateTrack);


module.exports = app;
