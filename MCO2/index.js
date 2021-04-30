const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const authRoutes = require('./routes/authRoutes');

// import module `routes` from `./routes/routes.js`
// const userRoutes = require('./routes/signUpController.js');
// const logInRoutes = require('./routes/LogInController.js');
// const trackRoutes = require('./routes/trackDBController.js');
// const playlistRoutes = require('./routes/playlistRoutes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
const port = 3000;
 
// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

// middlewarres
// parses incoming requests with urlencoded payloads
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.user(cookieParser());
// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));
app.use(authRoutes);



// define the paths contained in `./routes/routes.js`
// create indexoroutes inroutes
// app.use('/', indexRoutes);
// // routers
// app.use('', rouserRoutesutes);


// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
// 
app.use(function (req, res) {
	res.status(404)
    res.write('Not Found');
});

// connects to the database
db.connect();


// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
});
