
// import module `database` from `../models/db.js`
// const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const Track = require('../models/TrackModel.js');
const Playlist = require('../models/PlaylistModel.js');

const profileInfoController = {

	getPersonalInfo : function (req, res) {
    // Not sure
    User.findOne({user: req.jwt.user}, (err, result) => {
      res.render('/searchTracks?username' + username, {tracks: result});
    })
    .catch(err => {
      res.status(404).json({
        message: "Error"
      });
    }); 
  },

  getOtherProfile : function (req, res) {
    const id = req.params.id;
    User.findById(id).then(result => {
      render('/profileInfo', {artist: result});
    })
    .catch(err => {
      res.status(500).json({
        message: "Error"
      });
    }); 
  },


		deleteUser: function (req, res) {
        // HOW TO ACESS LOGGED IN USER
      Track.deleteMany({artist: username}).then(result => {
        console.log("success");
        Playlist.deleteMany({user: username}).then(result => {
            console.log(success);
            User.deleteMany({user: username}).then(result => {
              console.log(success);
              res.json({ redirect: 'login'})
            })
            .catch(err => {
              res.status(500).json({
                message: "Error"
              });
      }); 
        })
        .catch(err => {
          res.status(500).json({
            message: "Error"
          });
        }); 
        })
        .catch(err => {
          res.status(500).json({
            message: "Error"
          });
        }); 
      // how to acccess logedi n user
     

      // how to acccess logedi n user
      

  }
	
	};



module.exports = profileInfoController;
