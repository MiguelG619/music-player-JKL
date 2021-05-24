const express = require("express");
const signUpController = require("../controllers/signUpController");
const logInController = require("../controllers/logInController");

const searchTracksController = require("../controllers/searchTracksController");
const searchArtistsController = require("../controllers/SearchArtistsController");

const profileInfoController = require("../controllers/profileInfoController");
const profileEditController = require("../controllers/profileEditController");

const musicPlayerController = require("../controllers/musicPlayerController");
const uploadTrackController = require("../controllers/uploadTrackController");
const editTrackController = require("../controllers/editTrackController");

const playlistViewController = require("../controllers/playlistViewController");
const playlistEditController = require("../controllers/PlaylistEditController");

// const validation= require('../helpers/validation.js');

const app = express();

// LogIn SignUp LogOut
app.get("/getCheckUsername", signUpController.getCheckUsername);

app.get("/signUp", signUpController.getSignUp);
// app.post("/signUp", validation.signUpValidation(), signUpController.postSignUp);

app.post("/signUp", signUpController.postSignUp);

app.get("/", logInController.getLogIn);

app.post("/logIn", logInController.postLogIn);

app.get("/logOut", logInController.getLogOut);

// searchTracks and searchArtists
app.get("/searchTracks", searchTracksController.getAllTracks);

app.get("/searchOneTrack", searchTracksController.getOneTrack);

app.get("/searchArtists", searchArtistsController.getAllArtists);

app.get("/searchOneArtists", searchArtistsController.getOneArtist);

// profile
app.get("/profInfo", profileInfoController.getPersonalInfo);
/*To get the id of a different user in hbs
 	{{#each profile}}  
  		<a href=/profileInfo/{{this._id}}>

    {{/each}}
	
*/
app.get("/profInfo/:username", profileInfoController.getOtherProfile);

app.get("/profile/edit", profileEditController.getProfileEdit);

app.post("/profile/edit", profileEditController.updateProfile);

app.get("/profile/delete", profileEditController.deleteUser);

//muscisPlayer/Tracks
// app.get("/musicPlayer", musicPlayerController.getTrack);
app.get("/musicPlayer/:id", musicPlayerController.getTrack);

app.get("/upload", uploadTrackController.getUpload);

app.post("/upload", uploadTrackController.postTrack);
// <a href="editTrack/{{this._id}}</a> gawing anchr tag yung title ng track
app.get("/editTrack/:id", editTrackController.getEditTrack);

app.post("/editTrack", editTrackController.updateTrack);


app.get("/editTrack/delete/:id", editTrackController.deleteTrack);

// playlist
app.get("/playlistView", playlistViewController.getAllPlaylists);

app.get("/profInfo/playlist/tracks/:id", playlistViewController.getOnePlaylist);

app.post("/playlistView/create", playlistViewController.postPlaylist);

app.get("/playlist/edit/:id", playlistEditController.getPlaylistEdit);

app.post("/playlist/edit", playlistEditController.updatePlaylist);

app.get("/playlistView/add", playlistEditController.getPlaylistAdd);

app.post("/playlistView/edit", playlistEditController.postPlaylist);
// <a href="/playlistView/delete/{{this._id}}" onclick="return confirm("Are you sure to delete this track?");><i logo></i></a>
// gawing anchr tag yung delete button
app.get("/playlistView/delete/:id", playlistEditController.deletePlaylist);

module.exports = app;
