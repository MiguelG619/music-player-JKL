
// import module `express`
const express = require('express');

// import module `hbs`
const hbs = require('hbs');

// import module `routes` from `./routes/routes.js`
const userRoutes = require('./routes/userAuthenticationRoutes.js');
const trackRoutes = require('./routes/trackDBController.js');
const playlistRoutes = require('./routes/playlistRoutes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
const port = 3000;
 
// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);
// routers
app.use('', rouserRoutesutes);


// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
app.use(function (req, res) {
    res.render('error');
});

// connects to the database
db.connect();

app.get('/', function(req, res) { 
    res.render('login')
})

// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
});