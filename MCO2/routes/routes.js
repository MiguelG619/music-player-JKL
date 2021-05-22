const express = require("express");
const signUpController = require("../controllers/signUpController");
const logInController = require("../controllers/logInController");

const searchTracksController = require("../controllers/searchTracksController");
const searchArtistsController = require("../controllers/searchArtistsController");

const profileInfoController = require("../controllers/profileInfoController");
const profileEditController = require("../controllers/profileEditController");

const musicPlayerController = require("../controllers/musicPlayerController");
const uploadTrackController = require("../controllers/uploadTrackController");
const editTrackController = require("../controllers/editTrackController");

const playlistViewController = require("../controllers/playlistViewController");
const playlistEditController = require("../controllers/playlistEditController");

const validation= require('../helpers/validation.js');

const router = express.Router();

// LogIn SignUp LogOut
router.get("/getCheckUsername", signUpController.getCheckUsername);

router.get("/signUp", signUpController.getSignUp);
// router.post("/signUp", validation.signUpValidation(), signUpController.postSignUp);

router.post("/signUp", signUpController.postSignUp);

router.get("/", logInController.getLogIn);

router.post("/logIn", logInController.postLogIn);

router.get("/logOut", logInController.getLogOut);

// searchTracks and searchArtists
router.get("/searchTracks", searchTracksController.getAllTracks);

router.get("/searchOneTrack", searchTracksController.getOneTrack);

router.get("/searchArtists", searchArtistsController.getAllArtists);

router.get("/searchOneArtists", searchArtistsController.getOneArtist);

// profile
router.get("/profInfo", profileInfoController.getPersonalInfo);
/*To get the id of a different user in hbs
 	{{#each profile}}  
  		<a href=/profileInfo/{{this._id}}>

    {{/each}}
	
*/
router.get("/profInfo/:username", profileInfoController.getOtherProfile);

router.get("/profile/edit", profileEditController.getProfileEdit);

router.post("/profile/edit", profileEditController.updateProfile);

router.get("/profile/delete", profileEditController.deleteUser);

//muscisPlayer/Tracks
// router.get("/musicPlayer", musicPlayerController.getTrack);
router.get("/musicPlayer/:id", musicPlayerController.getTrack);

router.get("/upload", uploadTrackController.getUpload);

router.post("/upload", uploadTrackController.postTrack);
// <a href="editTrack/{{this._id}}</a> gawing anchr tag yung title ng track
router.get("/editTrack/:id", editTrackController.getEditTrack);

router.patch("/editTrack/:id", editTrackController.updateTrack);

// <a href="/editTrack/delete/{{this._id}}" onclick="return confirm("Are you sure to delete this track?");><i logo></i></a>
// gawing anchr tag yung delete button

router.get("/editTrack/delete/:id", editTrackController.deleteTrack);

// playlist
router.get("/playlistView", playlistViewController.getAllPlaylists);

router.get("/profInfo/playlist/tracks/:id", playlistViewController.getOnePlaylist);

router.post("/playlistView/create", playlistViewController.postPlaylist);

router.get("/playlistView/edit", playlistEditController.getPlaylistEdit);

router.patch("/playlistView/edit", playlistEditController.updatePlaylist);
// <a href="/playlistView/delete/{{this._id}}" onclick="return confirm("Are you sure to delete this track?");><i logo></i></a>
// gawing anchr tag yung delete button
router.get("/playlistView/delete/:id", playlistEditController.deletePlaylist);

module.exports = router;
