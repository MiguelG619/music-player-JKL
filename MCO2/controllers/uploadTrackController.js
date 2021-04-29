
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Track = require('../models/TrackModel.js');

const uploadTrackController = {

	postTrack : function (req, res) {
		// automatically gets the user input 
		const track = new Track(req.body);

		track.save().then((result) => {
			Track.find().then(resultTracks => {
			// tracks must be in hbs (tracks.title, tracks.image, etc.)
			// redirect to homepage with all tracks seen
			res.render('searchTracks', {tracks: resultTracks});
			})
			.catch((err) => {
				console.log(err);
			});
		});
	}

};


module.exports = userSignupController;
/*
	postTrack : function (req, res) {
		getTrackDetails - query of the request
		(!db.findOne) - Check title if no track yet,
		renderResult - redirect to home tracks with new track uploaded
		else 404
	}
*/