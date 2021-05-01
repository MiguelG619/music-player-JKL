const express = require("express");
// const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const searchRoutes = require("./routes/searchRoutes");
const session = require('express-session');
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);




// import module `routes` from `./routes/routes.js`
// const userRoutes = require('./routes/signUpController.js');
// const logInRoutes = require('./routes/LogInController.js');
// const trackRoutes = require('./routes/trackDBController.js');
// const playlistRoutes = require('./routes/playlistRoutes.js');

// import module `database` from `./model/db.js`
const db = require("./models/db.js");

const app = express();
const port = 3000;

// set `hbs` as view engine
app.set("view engine", "hbs");

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + "/views/partials");

// middlewarres
// parses incoming requests with urlencoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static(__dirname + "public"));
app.use(express.static(__dirname + "views"));

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));	

app.use(authRoutes);
app.use(profileRoutes);
app.use(trackRoutes);
app.use(playlistRoutes);
app.use(searchRoutes);

// define the paths contained in `./routes/routes.js`
// create indexoroutes inroutes
// app.use('/', indexRoutes);
// // routers
// app.use('', rouserRoutesutes);

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
//
app.use(function (req, res) {
  res.status(404);
  res.write("Not Found");
});

// connects to the database
db.connect();

// binds the server to a specific port
app.listen(port, function () {
  console.log("app listening at port " + port);
});
