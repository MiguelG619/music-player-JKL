const express = require('express');

// const <controller> = require(<controller.path>);

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');
const profileController = require('../controllers/profileController.js');

// app.get('<path>', <controller name>.<getter>);
// app.post('<path>', <controller name>.<getter>);
// app.delete('<path>', <controller name>.<getter>);

// In HBS --> <a href="/musicPlayer/{{track._id}}">
	// 			<div class="the-track"></div>
	// 13:30s https://www.youtube.com/watch?v=VVGgacjzc2Y&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=10
// ._id is automatically generated in mongoose
app.get('/musicPlayer/:id', musicPlayerController.getTrack);




// MUST BE IN THE BOTTOM
app.user((req, res) => {
	res.status(404).json({
		message: "Error",
    });
});