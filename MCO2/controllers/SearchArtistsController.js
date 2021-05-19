const User = require("../models/UserModel.js");

const searchArtistsController = {
  getAllArtists: function (req, res) {
    User.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("searchArtists", { artist: result });
      })
      .catch((err) => {
        res.status(404).json({
          message: "Error",
        });
      });
  },

  getOneArtist: function (req, res) {
    console.log(req.query.search);
    User.findOne(
      { username: { $regex: req.query.search, $options: "i" } },
      (err, result) => {
        if (result) {
          console.log(result);
          res.render("searchArtist", { artist: result });
        } else {
          res.status(404).json({
            message: "Artist not found",
          });
        }
      }
    ).catch((err) => {
      res.status(404).json({
        message: "Error",
      });
    });
  },
};

module.exports = searchArtistsController;
/*
	getArtists : function (req, res) {
		getUserQuery
		(db.findOne)
		render - redirect to tracks but with searched artists only
		else 404
	}
*/
