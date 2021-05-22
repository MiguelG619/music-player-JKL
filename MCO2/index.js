const dotenv = require(`dotenv`);
const express = require("express");
const hbs = require("hbs");
const session = require("express-session");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const db = require("./models/db.js");

const app = express();
dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

// set `hbs` as view engine
app.set("view engine", "hbs");

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + "/views/partials");

// middlewarres
// parses incoming requests with urlencoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
app.use(
	session({
		secret: "ccapdev-session",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

app.use(routes);

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
app.listen(port, hostname, () => {
	console.log(`Server running at: `);
	console.log("https://" + hostname + ":" + port);
});
