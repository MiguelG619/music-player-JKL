
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

// const uploadTrackController = {
/*
	postTrack : function (req, res) {
		getTrackDetails - query of the request
		(!db.findOne) - Check title if no track yet,
		renderResult - redirect to home tracks with new track uploaded
		else 404
	}
*/